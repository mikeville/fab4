//hide labels until hover
//group hover
//other features to lsit

//add 1px padding between bars instead of the white stroke it hink? or make stroke same color as bg

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

    var barHeight = width/10
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




$(function(){

  timeline = new TimelineStructure1()
  
  $(window).resize(function() {
  var width = $("#timeline-container").width();
  var height = width/10
  d3.selectAll("svg").attr("width", width);
  d3.selectAll("svg").attr("height", height);
  });

})
