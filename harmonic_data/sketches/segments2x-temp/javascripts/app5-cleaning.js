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
var trackHeight;
var trackAspect = 60;
var tinyTrackAspect = 200;


//ROUTES (coming soon)
var App = Backbone.Router.extend({
  initialize: function(){
    this.TEMP_makeAppFrame()
  },
  TEMP_makeAppFrame: function(){
    console.log("app frame drawn. welcome to app")
  },
  TEMP_drawTimeline: function(){
    console.log("we'd do d3 stuff now")
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
        .attr("class", "tiny-album-container tiny-album-container-"+albumData.albumKey)

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
      .attr("class", "tiny-track track-"+trackData.trackIndex)
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






legendNavHider = function(){
  // $("#context-nav").show()
  // console.log("sticking")
}



$(function(){

  // **** START APP
  var app = new App();


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
  })
  

  // **** GET FRAME SIZE FOR RESPONSIVENESS
  //is this the best place for this to go?
  $(window).resize(function() {
    trackWidth = $("#timeline-container").width();
    tinyTrackHeight = trackWidth/tinyTrackAspect
    d3.selectAll("#tiny-track").attr("width", trackWidth);
    d3.selectAll("#tiny-track").attr("height", tinyTrackHeight);
  });

  ssmTest()
  addNavEvents()

  // // **** ADD STICKINESS
  // $("#context-module").stick_in_parent()
  //   .on("sticky_kit:stick", function(e){
  //     legendNavHider();
  //   })




  

})
