//GLOBAL DATA

var dataMaster,
    dataMasterByRelease = [];

var sortDataMasterByRecording = function(){
  //TODO: add if then statement that doesn't parse the data if it already exists
  _.each(dataMaster, function(albumData){
    _.each(albumData.tracks, function(trackData){
      dataMasterByRelease.push(trackData)
    })

  })
  return dataMasterByRelease
}

//GLOBAL VARIABLES...TODO: contain these in timeline object?

var trackWidth;
var tinyTrackHeight;
var trackHeight;
var trackAspect = 20;
var tinyTrackAspect = 200;


//ROUTES (coming soon)
var App = Backbone.Router.extend({

  routes: {
    'song-structure': 'songStructure',
    'authorship-and-collaboration': 'authorship',
    'working-schedule': 'schedule',
    'in-the-studio': 'inTheStudio',
    'lyrical-syntax': 'lyricalSyntax',
    'self-reference': 'selfReference'
    //go to error page if these aren't found? or redirect to home page?
  },

  songStructure: function(){
    //if data hasn't been prepared...prepare it...then set it to the metaData thing.
    app.metaData = metaDataMaster.songStructure
    app.uiMaker()
    //draw timeline specific stuff
  },

  authorship: function(){
    app.metaData = metaDataMaster.authorship
    app.uiMaker()
  },

  schedule: function(){
    app.metaData = metaDataMaster.schedule
    app.uiMaker()
  },

  inTheStudio: function(){
    app.metaData = metaDataMaster.inTheStudio
    app.uiMaker()
  },

  lyricalSyntax: function(){
    app.metaData = metaDataMaster.lyricalSyntax
    app.uiMaker()
  },

  selfReference: function(){
    app.metaData = metaDataMaster.selfReference
    app.uiMaker()
  },


  uiMaker: function(){
    //create/append all stuff common to every timeline
    if (ui) ui.remove()
    var ui = new UI()
  },

  initialize: function(){
    this.TEMP_makeAppFrame()
      // **** ADD STICKINESS
  },
  TEMP_makeAppFrame: function(){
    console.log("app frame drawn. welcome to app")
  },
  TEMP_drawTimeline: function(){
    console.log("we'd do d3 stuff now")
  }
})


var UI = Backbone.View.extend({
  initialize: function(){
    this.render({
      timelineHeading: new UI.TimelineHeading,
      legend: new UI.Legend
    });
  },
  render: function(sub_views){
    _.each(sub_views, function(view){
      view.$el.empty()
      view.render()
    })
    return this;
  }
})

UI.TimelineHeading = Backbone.View.extend({
  el: function(){
    return $('#timeline-header-container')
  },
  template: function(attributes){
    var source = $('#timeline-header-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    return this
  }
})


UI.Legend = Backbone.View.extend({
  el: function(){
    return $('#legend-container')
  },
  template: function(attributes){
    var source = $('#legend-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    return this
  }
})




// EVENTS

addNavEvents = function(){
  $("#nav-link-legend").on("click", function(e){
    e.preventDefault()
    $("#notes-container").hide()
    $("#legend-container").show()
  })
  $("#nav-link-notes").on("click", function(e){
    e.preventDefault()
    $("#legend-container").hide()
    $("#notes-container").show()
      .html("<p>Click tracks to read excerpts from Alan W. Pollack's <a href='http://www.icce.rug.nl/~soundscapes/DATABASES/AWP/awp-notes_on.shtml'>'Notes on...'</a> series</p>")
  })
  $("#nav-link-hide").on("click", function(e){
    e.preventDefault()
    $("#legend-container").hide()
    $("#notes-container").hide()
  })
  $("#sort-link-album").on("click", sortByAlbum)
  $("#sort-link-recording").on("click", function(e){
    e.preventDefault;
    $("#timeline-container").empty();
    TimeLineStructureRecordingDate();
  })
}

sortByAlbum = function(){
  console.log("album sort")
}




// RESPONSIVENESS

ssmTest = function(){
  ssm.addStates([
  {
    id: 'mobile',
    maxWidth: 640,
    onEnter: function(){
      contextModuleToMobile();
    }
  },
  {
    id: 'tablet-desktop',
    minWidth: 640,
    onEnter: function(){
      contextModuleToSidebar();
    }
  }
  ]).ready()
}

contextModuleToSidebar = function(){
  $("#context-module").removeClass("context-module-mobile")
    .addClass("context-module-desktop")
    // .css("float", "right")
  $('#timeline-container').addClass("timeline-container-desktop")
  $('#nav-link-hide').hide();

}

contextModuleToMobile = function(){
  $("#context-module").removeClass("context-module-desktop")
  $('#timeline-container').removeClass("timeline-container-desktop")
  $('#context-module').addClass("context-module-mobile")
  $('#nav-link-hide').show();
}






// **** DRAW D3


structureTinyByRecording = function(){
  _.each(dataMasterByRelease, function(trackData){
    structureTrackTiny(trackData)
  }) 
}

structureTinyByRelease = function(){
  _.each(dataMaster, function(albumData){
    d3.select("#tiny-container").append("div")
        .attr("class", "tiny-album-separator tiny-album-separator-"+albumData.albumKey)
    _.each(albumData.tracks, function(trackData){
      structureTrackTiny(trackData)
    })
  }) 
}

structureTrackTiny = function(trackData){
  trackWidth = $("#timeline-container").width(); //or this.el.width() w/ backbone
  tinyTrackHeight = trackWidth/tinyTrackAspect

  var maxBarWidth = 290 //TODO: clean this up. right now it's for guitar gently weeps.
  var widthFactor = trackWidth/maxBarWidth;

  var svg = d3.select("#tiny-container").append("div")
      .attr("class", "tiny-track-container")
    .append("svg")
      .attr("class", "tiny-track tiny-track-"+trackData.trackIndex)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+trackWidth+" "+tinyTrackHeight)
      .attr("width", trackWidth)
      .attr("height", tinyTrackHeight)

  svg.selectAll("rect")
      .data(trackData.segments)
    .enter().append("rect")
      .attr("x", function(d) { return d.start*widthFactor })
      .attr("y", 0)
      .attr("width", function(d) { return (d.end-d.start)*widthFactor})
      .attr("height", tinyTrackHeight)
      .attr("class", function(d) { return "segment_"+d.segment })
    .on("click", function(d){
      console.log(d.segment)
      // sortTest(d)
    })
}




structureByRecording = function(){
  _.each(dataMasterByRelease, function(trackData){
    structureTrack(trackData)
  }) 
}

structureByRelease = function(){
  _.each(dataMaster, function(albumData){
    d3.select("#big-timeline-container").append("div")
        .attr("class", "album-separator album-separator-"+albumData.albumKey)
    _.each(albumData.tracks, function(trackData){
      structureTrack(trackData)
    })
  }) 
}


structureTrack = function(trackData){
  trackWidth = $("#timeline-container").width(); //or this.el.width() w/ backbone
  trackHeight = trackWidth/trackAspect

  var maxBarWidth = 290 //TODO: clean this up. right now it's for guitar gently weeps.
  var widthFactor = trackWidth/maxBarWidth;


  var source = $('#track-container-template').html();
      var template = Handlebars.compile(source)
      $("#big-timeline-container").append(template(trackData))


  var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
      .attr("class", "track track-"+trackData.trackIndex)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+trackWidth+" "+trackHeight)
      .attr("width", trackWidth)
      .attr("height", trackHeight)

  svg.selectAll("rect")
      .data(trackData.segments)
    .enter().append("rect")
      .attr("x", function(d) { return d.start*widthFactor })
      .attr("y", 0)
      .attr("width", function(d) { return (d.end-d.start)*widthFactor})
      .attr("height", trackHeight)
      .attr("class", function(d) { return "segment_"+d.segment })
    .on("click", function(d){
      console.log(d.segment)
      // sortTest(d)
    })
}





legendNavHider = function(){
  // $("#context-nav").show()
  // console.log("sticking")
}



$(function(){


  // **** START APP
  window.app = new App();
  Backbone.history.start();



  // **** GET DATA

  d3.json("/data/dataSegments.json", function(error, json) {
    if (error) return console.warn(error);
    dataMaster = json.beatlesData;
    console.log("loaded Beatles data")

  // **** DRAW TIMELINE
    // this may need to move into routes?
    app.TEMP_drawTimeline()

    sortDataMasterByRecording() //TODO: make it only load data if it doesn't exist yet. (esepcially cause it will just push it)
    structureTinyByRelease() //TODO: this should go in routes i think, not in callback? i don't know
    structureByRelease()
  })
  

  // **** GET FRAME SIZE FOR RESPONSIVENESS
  //is this the best place for this to go?
  $(window).resize(function() {
    trackWidth = $("#timeline-container").width();
    tinyTrackHeight = trackWidth/tinyTrackAspect
    d3.selectAll(".tiny-track").attr("width", trackWidth);
    d3.selectAll(".tiny-track").attr("height", tinyTrackHeight);

    trackHeight = trackWidth/trackAspect
    d3.selectAll(".track").attr("width", trackWidth);
    d3.selectAll(".track").attr("height", trackHeight);

  });

  ssmTest()
  addNavEvents()


  $("#context-module").stick_in_parent()
    .on("sticky_kit:stick", function(e){
      legendNavHider();
    })


  

})
