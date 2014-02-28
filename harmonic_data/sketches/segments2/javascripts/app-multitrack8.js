//hide labels until hover
//group hover

$(function(){

_.each(dataSegments, function(album){
  console.log(album.albumTitle)
  $('body').append("<div class='"+album.albumKey+"'></div>")
  $("."+album.albumKey).append("<h3 class='album-title-label'>"+album.albumTitle+"</h3>")


var dataset = album

var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

var barHeight = 15
var widthFactor = 4
var paddingVert = 10
var textPadding = 15




var g = d3.select("."+album.albumKey).selectAll("svg")
    .data(dataset.tracks)
  .enter().append("svg")
    .attr("width", width)
    .attr("height", barHeight+textPadding)
  .append("g")
    // .attr("class", "group")
    // .attr("transform", function(d, i) {return "translate(0,"+(i*barHeight)+")"})

g.append("text")
  .attr("class", "track-title-label")
  .attr("x", 0)
  .attr("y", textPadding-2)
  .text(function(d) {return d.trackTitle})


g.selectAll("rect")
  .data(function(d, i){
    return dataset.tracks[i].segments
  })
  .enter()
    .append("rect")
    .attr("x", function(d) { return d.start*widthFactor })
    .attr("y", textPadding)
    .attr("width", function(d) { return (d.end-d.start)*widthFactor })
    .attr("height", barHeight)
    .style("stroke", "white")
    .attr("class", function(d) { return "segment_"+d.segment })

g.selectAll("text")
    .data(function(d, i){
      return dataset.tracks[i].segments
    })
  .enter()
    .append("text")
    .attr("class", "segment-label")
    .attr("x", function(d) { return d.start*widthFactor })
    .attr("y", (textPadding*1.75))
    .attr("width", function(d) { return (d.end-d.start)*widthFactor })
    .text( function(d) { return d.segment})


})

})
