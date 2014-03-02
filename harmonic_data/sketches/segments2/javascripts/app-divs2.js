//hide labels until hover
//group hover
//other features to lsit



TimelineStructure1 = function(){

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

    segments = trackData.segments
    trackKey = trackData.trackTitle.replace(/\s/g, '');

    var width = $("#timeline-container").width();
    var barHeight = width/10
    var widthFactor = 1

    var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
      // .attr("width", width)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+width+" "+barHeight)
      .attr("width", width)
      .attr("height", barHeight)

    svg.selectAll("rect")
        .data(segments)
      .enter().append("rect")
        .attr("x", function(d) { return d.start*widthFactor })
        .attr("y", 0)
        .attr("width", function(d) { return (d.end-d.start)*widthFactor })
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
