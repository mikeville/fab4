//GLOBAL DATA

var dataMaster,
    dataMasterByRecording = [];

var sortDataMasterByRecording = function(){
  if (dataMasterByRecording.length != 0){
    return dataMasterByRecording
  } else {
    // dataMasterByRecording = [];
    _.each(dataMaster, function(albumData){
      _.each(albumData.tracks, function(trackData){
        dataMasterByRecording.push(trackData)
      })
    })
    return dataMasterByRecording
  }
}

//GLOBAL VARIABLES...TODO: contain these in timeline object?

var trackWidth;
var tinyTrackHeight;
var trackHeight;
var trackAspect = 40;
var tinyTrackAspect = 200;


//ROUTES (coming soon)
var App = Backbone.Router.extend({
  initialize: function(){
    console.log("initting")
    screenModesInit()
    ssmTest()
    addNavEvents()
  },

  routes: {
    '': 'songStructure',
    'song-structure': 'songStructure',
    'authorship-and-collaboration': 'authorship',
    'working-schedule': 'schedule',
    'in-the-studio': 'inTheStudio',
    'lyrical-syntax': 'lyricalSyntax',
    'self-reference': 'songTest'
    //go to error page if these aren't found? or redirect to home page?
  },

  songTest: function(){
    songSketch();
  },

  songStructure: function(){
    //if data hasn't been prepared...prepare it...then set it to the metaData thing.
    app.metaData = metaDataMaster.songStructure
    app.uiMaker()
    sortByRelease()
  },

  authorship: function(){
    app.metaData = metaDataMaster.authorship
    app.uiMaker()
    app.authorshipTest()
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


  authorshipTest: function(){
    _.each(dataMaster, function(albumData){
        var source = $('#album-label-template').html();
        var template = Handlebars.compile(source)
        $("#big-timeline-container").append(template(albumData))

      _.each(albumData.tracks, function(trackData){
        authorshipTestDrawD3(trackData)
      })
    }) 
  

  },



  uiMaker: function(){
    //create/append all stuff common to every timeline
    if (ui) ui.remove()
    var ui = new UI()
  }
})



authorshipTestDrawD3 = function(trackData){
  trackWidth = $("#timeline-container").width(); //or this.el.width() w/ backbone
  trackHeight = trackWidth/trackAspect

  var maxBarWidth = trackWidth //TODO: clean this up. right now it's for guitar gently weeps.
  var widthFactor = trackWidth/maxBarWidth;


  var source = $('#track-container-template').html();
      var template = Handlebars.compile(source)
      $("#big-timeline-container").append(template(trackData))

  var authorWidth = 200 //TODO: make this relative, not hardcoded
  var authorArray = [{author: "McCartney", start: 0, end:0},
                     {author: "Lennon", start: 0, end:0},
                     {author: "Harrison", start: 0, end:0},
                     {author: "Starr", start: 0, end:0},
                     {author: "Other", start: 0, end:0}]  
      authorArray[0].end = (trackData.authorship[0].McCartney) * authorWidth      //******GIVE THIS A FUCKING TOWEL
      authorArray[1].start = (trackData.authorship[0].McCartney) * authorWidth    //******GIVE THIS A FUCKING TOWEL
      authorArray[1].end = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon) * authorWidth
      authorArray[2].start = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon) * authorWidth
      authorArray[2].end = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon + trackData.authorship[2].Harrison) * authorWidth
      authorArray[3].start = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon + trackData.authorship[2].Harrison) * authorWidth
      authorArray[3].end = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon + trackData.authorship[2].Harrison + trackData.authorship[3].Starr) * authorWidth
      authorArray[4].start = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon + trackData.authorship[2].Harrison + trackData.authorship[3].Starr) * authorWidth
      authorArray[4].end = (trackData.authorship[0].McCartney + trackData.authorship[1].Lennon + trackData.authorship[2].Harrison + trackData.authorship[3].Starr + trackData.authorship[4].Other) * authorWidth


  var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
      .attr("class", "track track-"+trackData.trackIndex)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+trackWidth+" "+trackHeight)
      .attr("width", trackWidth)
      .attr("height", trackHeight)

  svg.selectAll("rect")
      .data(authorArray)
    .enter().append("rect")
      .attr("x", function(d) { return d.start*widthFactor })
      .attr("y", 0)
      .attr("width", function(d) { return (d.end-d.start)*widthFactor})
      .attr("height", trackHeight)
      .attr("class", function(d) { return "author_"+d.author })
      // .style("stroke", "black")
      // .style("fill", "none")
    .on("click", function(d){
      console.log(d.author)
      // sortTest(d)
    })

  if (
    ( trackData.authorship[0].McCartney != 1 )
    && ( trackData.authorship[1].Lennon != 1 )
    && ( trackData.authorship[2].Harrison != 1 )
    && ( trackData.authorship[3].Starr != 1 )
    && ( trackData.authorship[4].Other != 1 )) {
    svg.append("ellipse")
      .attr("cx", authorWidth+authorWidth/4)
      .attr("cy", trackHeight/2)
      .attr("rx", trackHeight/2)
      .attr("ry", trackHeight/2)
      .style("fill", "red")
  }

   $(".track-"+trackData.trackIndex).on("click", function(){
        updateNotes(trackData)
      })


}









var UI = Backbone.View.extend({
  initialize: function(){
    this.render({
      timelineHeading: new UI.TimelineHeading,
      contextModuleSidebar: new UI.ContextModuleSidebar,
      contextModuleMobile: new UI.ContextModuleMobile,
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

UI.ContextModuleSidebar = Backbone.View.extend({
  el: function(){
    return $('#context-module-sidebar')
  },
  template: function(attributes){
    var source = $('#context-module-sidebar-template').html();
    var template = Handlebars.compile(source)
    return template(attributes)
  },
  renderLegend: function(){
    var sourceLegend = $("#legend-content-structure-template").html()
    var templateLegend = Handlebars.compile(sourceLegend)
    $("#legend-content-container").html(templateLegend)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    this.renderLegend()
    return this
  }
})

UI.ContextModuleMobile = Backbone.View.extend({
  el: function(){
    return $('#context-module-mobile')
  },
  template: function(attributes){
    var source = $('#context-module-mobile-template').html();
    var template = Handlebars.compile(source)
    return template(attributes)
  },
  renderLegend: function(){
    var sourceLegend = $("#legend-content-structure-template").html()
    var templateLegend = Handlebars.compile(sourceLegend)
    $("#legend-content-container-mobile").html(templateLegend)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    this.renderLegend()
    return this
  }
})



// EVENTS

addNavEvents = function(){
  $("#nav-link-legend-mobile").on("click", function(e){
    e.preventDefault()
        console.log("hide")
    $("#notes-content-container").hide()
    $("#legend-content-container").show()
  })
  $("#nav-link-notes-mobile").on("click", function(e){
    e.preventDefault()
        console.log("hide")
    $("#legend-content-container").hide()
    $("#notes-content-container").show()
      .html("<p>Click tracks to read excerpts from Alan W. Pollack's <a href='http://www.icce.rug.nl/~soundscapes/DATABASES/AWP/awp-notes_on.shtml'>'Notes on...'</a> series</p>")
  })
  $("#nav-link-hide-mobile").on("click", function(e){
    e.preventDefault()
    console.log("hide")
    $("#legend-content-container").hide()
    $("#notes-content-container").hide()
  })

  $("#sort-link-album").on("click", function(e){
    e.preventDefault;
    sortByRelease();
  })
  $("#sort-link-recording").on("click", function(e){
    e.preventDefault;
    sortByRecording();
  })
}

sortByRelease = function(){
  $('#tiny-container').html("");
  $('#big-timeline-container').html("");
  structureTinyByRelease() //TODO: this should go in routes i think, not in callback? i don't know
  structureByRelease() 
}

sortByRecording = function(){
  $('#tiny-container').html("");
  $('#big-timeline-container').html("");
  sortDataMasterByRecording() //TODO: make it only load data if it doesn't exist yet. (esepcially cause it will just push it)
  structureTinyByRecording() //TODO: this should go in routes i think, not in callback? i don't know
  structureByRecording() 
}

var updateNotes = function(trackData){
  $("#legend-content-container-mobile").hide()
  $("#notes-content-container-mobile").show()
  var source = $('#notes-template').html();
  var template = Handlebars.compile(source)
  $('#notes-content-container-mobile').html(template(trackData))
  $('#notes-content-container-sidebar').append(template(trackData))
  $('#notes-content-container-sidebar').append(template(trackData))
  $('#notes-content-container-sidebar').append(template(trackData))
  $('#notes-content-container-sidebar').append(template(trackData))
}


// RESPONSIVENESS

screenModesInit = function(){
  if ( $(window).width() < 640) {
    screenModes.mobile()
  } else if ( $(window).width() < 1024) {
    screenModes.tablet()
  } else {
    screenModes.desktop()
  }
}

screenModes = {
  mobile: function(){
    console.log("you're in mobile mode")
    $("#context-module-sidebar").hide()
    $("#context-module-mobile").show()
    $('#meta-content-container').removeClass("non-mobile")
    // $('#timeline-intro').addClass("mobile")
    addNavEvents();
  },

  tablet: function(){
    console.log("you're in tablet mode")
    $("#context-module-mobile").hide()
    $("#context-module-sidebar").show()
    $('#meta-content-container').addClass("non-mobile")
    // $('#timeline-intro').removeClass("mobile")
  },

  desktop: function(){
    console.log("you're in desktop mode")
    $("#context-module-mobile").hide()
    $("#context-module-sidebar").show()
    $('#meta-content-container').addClass("non-mobile")
    //I LEFT OFF NEEDING TO CALL THESEE THINGS ON INITTTTTT
    
  }
}


ssmTest = function(){
  ssm.addStates([
  {
    id: 'mobile',
    maxWidth: 640,
    onEnter: function(){
      // contextModuleToMobile();
      screenModes.mobile()
    }
  },
  {
  id: 'tablet',
  minWidth: 640,
  maxWidth: 1024,
  onEnter: function(){
    // tabletMode();
    screenModes.tablet();
  }
},
  {
    id: 'tablet-desktop',
    minWidth: 640,
    onEnter: function(){
      contextModuleToSidebar();
    }
  },
  {
    id: 'desktop',
    minWidth: 1024,
    onEnter: function(){
      // desktopMode();
      screenModes.desktop()
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

  $('.year-mark-label').hide();
}

tabletMode = function(){
  $('.year-mark-label').hide();
}

desktopMode = function(){
  $('.year-mark-label').show();
}




// **** DRAW D3


structureTinyByRecording = function(){
  _.each(dataMasterByRecording, function(trackData){
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
  _.each(dataMasterByRecording, function(trackData){
    structureTrack(trackData)
    $(".track-container-"+trackData.trackIndex).prepend("<div class='year-mark-container'><p class='year-mark-label'>"+trackData.yearMark+".<p></div>")
    //TODO: make this from a template
  }) 
}

structureByRelease = function(){
  _.each(dataMaster, function(albumData){
      var source = $('#album-label-template').html();
      var template = Handlebars.compile(source)
      $("#big-timeline-container").append(template(albumData))





    _.each(albumData.tracks, function(trackData){
      structureTrack(trackData)
    })
  }) 
}


structureTrack = function(trackData){
  trackWidth = $("#timeline-container").width(); //or this.el.width() w/ backbone
  trackHeight = trackWidth/trackAspect

  var maxBarWidth = 600 //TODO: clean this up. right now it's for guitar gently weeps.
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

   $(".track-"+trackData.trackIndex).on("click", function(){
        updateNotes(trackData)
      })


}





legendNavHider = function(){
  // $("#context-nav").show()
  // console.log("sticking")
}


var chordSample

songSketch = function(){
  $('#tiny-container').html("");
  $('#big-timeline-container').html("");
  console.log("starting test")


    chordSample = dataMaster[0].tracks[0].chords
    var chordsParsed = chordParser(chordSample)
    var songHeight = 2000

    var pointWidthFactor = 500/48
    var heightFactor = 5

    svg = d3.select("#song-container").append("svg")
      // .attr("preserveAspectRatio", "xMidYMid")
      // .attr("viewBox", "0 0 "+trackWidth+" "+trackHeight)
      .attr("width", trackWidth)
      .attr("height", songHeight)
      // .style("background-color", "red")

    svg.selectAll("rect")
        .data(chordsParsed)
      .enter().append("rect")
        .attr("x", function(d){ return d.chordNumber*pointWidthFactor })
        .attr("y", function(d){ return (d.start)*heightFactor })
        .attr("width", pointWidthFactor )
        .attr("height", function(d){ return (d.end-d.start)*heightFactor })
        .style("fill", "white")
}

chordParser = function(chordSample){
  return _.each(chordSample, function(chordData){
    switch(chordData.chord)
    {
      case "N": chordData.chordNumber = 48; break;
      case "A": chordData.chordNumber = 1; break;
      case "A:min/b3": chordData.chordNumber = 13; break;
      case "E": chordData.chordNumber = 8; break;
      case "E:9": chordData.chordNumber = 8; break;
      case "E:7/3": chordData.chordNumber = 8; break;
      case "B": chordData.chordNumber = 3; break;
      default: chordData.chordNumber = 0;
    }
  })
}






$(function(){


  // **** START APP
  



  // **** GET DATA

  d3.json("/data/dataSegments.json", function(error, json) {
    if (error) return console.warn(error);
    dataMaster = json.beatlesData;
    console.log("loaded Beatles data")

  // **** DRAW TIMELINE
    // this may need to move into routes?
    window.app = new App();
    Backbone.history.start();
    // app.TEMP_drawTimeline()

    // sortByRelease()
    // app.authorship()
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





  $("#context-module-mobile").sticky({topSpacing:0});
  $("#context-module-sidebar").sticky({topSpacing:0}).parent().addClass("stick-right")

  // $("#context-module-mobile").stick_in_parent()
  // $("#context-module-sidebar").stick_in_parent()
    // .on("sticky_kit:stick", function(e){
    //   // legendNavHider();
    // })

  

})
