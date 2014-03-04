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

var timeline = Backbone.View.extend({
  defaults: {
    TEMP_widthFactor: 1
  }
})





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



// var d3Maker2TEMPMicro = function(trackData){


//     var ratioFactor = 160
//     var width = $("#timeline-container").width();
//     var height = width/ratioFactor
//       // var maxBarWidth = 502.200 //data's time length for Reovlution 9. todo: change to carnival's long length or make this programmatic using d3's .max method
//       var maxBarWidth = 290 //adjusting for while my guitar gently weeps

//       // var barHeight = width/20 //todo: fix bug for floating text weird height gaps
//       var widthFactor = width/maxBarWidth //1.35 factor from 384 px wide on guitar weep

//       var svg = d3.select(".micro-track-"+trackData.trackIndex).append("svg")
//         // .attr("width", width)
//         .attr("preserveAspectRatio", "xMidYMid")
//         .attr("viewBox", "0 0 "+width+" "+height)
//         .attr("width", width)
//         .attr("height", height)
//         .attr("class", "micro-svg")

//       svg.selectAll("rect")
//           .data(trackData.segments)
//         .enter().append("rect")
//           .attr("x", function(d) { return d.start*widthFactor })
//           .attr("y", 0)
//           .attr("width", function(d) { return (d.end-d.start)*widthFactor})
//           .attr("height", height)
//           // .style("stroke", "white")
//           .attr("class", function(d) { return "segment_"+d.segment })

//     }

//     _.each(tracksByDate, function(trackData){
//       trackMakerMicro(trackData)
//       d3Maker2TEMPMicro(trackData.trackIndex)
//     })


$(function(){
  //TODO: how to only make the app, or only load the data, if it hasn't been loaded yet?

  var app = new App();

  d3.json("/data/dataSegments.json", function(error, json) {
    if (error) return console.warn(error);
    dataMaster = json.beatlesData;
    console.log("loaded Beatles data")
    app.TEMP_drawTimeline()
    

    sortDataMasterByRecording() //TODO: make it only load data if it doesn't exist yet. (esepcially cause it will just push it)
    structureTinyByRelease() //TODO: this should go in routes i think, not in callback? i don't know
  })
  

  //is this the best place for this to go?
  $(window).resize(function() {
    trackWidth = $("#timeline-container").width();
    tinyTrackHeight = trackWidth/tinyTrackAspect
    d3.selectAll("#tiny-track").attr("width", trackWidth);
    d3.selectAll("#tiny-track").attr("height", tinyTrackHeight);
    // console.log("width: "+trackWidth+", height: "+tinyTrackHeight)
  });

  

})