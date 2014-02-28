$(function(){


var dataset = dataRevolverSegments.tracks[1].segments

var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


var barHeight = 50
var widthFactor = 3

var barStack = svg.selectAll("g")
          .data(dataRevolverSegments.tracks)
          .enter()
          .append("svg:g")
          .attr("transform", function(d, i){
            return "translate(0," + (d.order*barHeight+2) + ")"
          })

svg.selectAll("rect")
    .data(function(d, i){
      return dataRevolverSegments.tracks[i].segments
    })
    .enter()
    .append("rect")
    .attr("x", function(d, i){
      return d.start*widthFactor
    })
    .attr("y", function(d, i){
      // return barHeight*i
      return barHeight*i
    })
    .attr("width", function(d){
      return (d.end-d.start)*widthFactor
    })
    .attr("height", barHeight)
    .style("fill", "none")
    .style("stroke", "black")
    .attr("class", function(d){
      return "segment_"+d.segment
    })

svg.selectAll("text")
    .data(function(d, i){
      return dataRevolverSegments.tracks[i].segments
    })
    .enter()
    .append("text")
    .attr("x", function(d, i){
      return d.start*widthFactor
    })
    .attr("y", function(d, i){
      // return barHeight*i
      return barHeight*i
    })
    .text(function(d){
      return d.segment
    })



})