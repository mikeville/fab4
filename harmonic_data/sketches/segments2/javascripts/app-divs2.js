

//port over to sass file
//make black segments colored.
//hide labels until hover
//group hover
//remove silences from data (and start data versioning history)
//change font size for smaller bars
//change bar ratio or wahtever for smaller size

//add legend box for mobile
//toggle labels on/off on mobile

//add notes feature


TimelineStructure1 = function(){

  var self = this
  self.maxWidth = 0

  var dataset = dataSegments

  var initialize = function(){
    _.each(dataset, function(albumData){
      album(albumData)

      _.each(albumData.tracks, function(trackData){
        track(trackData, albumData)
        d3Maker(trackData)
      })

    })
  }

  var album = function(albumData){
    var source = $('#album-container-template').html();
    var template = Handlebars.compile(source)
    $('#timeline-container').append(template(albumData))
  }

  var track = function(trackData, albumData){
    var albumKey = albumData.albumKey
    var source = $('#track-container-template').html();
    var template = Handlebars.compile(source)
    $("#album-"+albumKey).append(template(trackData))
  }

  var d3Maker = function(trackData){


    var width = $("#timeline-container").width();
    // var maxBarWidth = 502.200 //data's time length for Reovlution 9. todo: change to carnival's long length or make this programmatic using d3's .max method
    var maxBarWidth = 290 //adjusting for while my guitar gently weeps

    var barHeight = width/10 //todo: fix bug for floating text weird height gaps
    var widthFactor = width/maxBarWidth //1.35 factor from 384 px wide on guitar weep

    var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
      // .attr("width", width)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+width+" "+barHeight)
      .attr("width", width)
      .attr("height", barHeight)

    svg.selectAll("rect")
        .data(trackData.segments)
      .enter().append("rect")
        .attr("x", function(d) { return d.start*widthFactor })
        .attr("y", 0)
        .attr("width", function(d) { return (d.end-d.start)*widthFactor})
        .attr("height", barHeight)
        .style("stroke", "white")
        .attr("class", function(d) { return "segment_"+d.segment })

  }

  initialize()
}

legendNavHider = function(){
  // $("#context-nav").show()
  // console.log("sticking")
}


ssmTest = function(){
  ssm.addState({
    id: 'desktop',
    minWidth: 1024,
    onEnter: function(){
      contextModuleToSidebar();
    }
  }).ready()
}

contextModuleToSidebar = function(){
  console.log("big mode now")
}


$(function(){

  timeline = new TimelineStructure1()
  
  $(window).resize(function() {
  var width = $("#timeline-container").width();
  var height = width/10
  d3.selectAll("svg").attr("width", width);
  d3.selectAll("svg").attr("height", height);
  });

  // $("#context-nav").hide()

  $("#context-module").stick_in_parent()
    .on("sticky_kit:stick", function(e){
      legendNavHider();
    })

  ssmTest()

})
