// FunctionThing = function(){
//   this.dataset = dataSegments
// }

$(function(){

// functionThing = new FunctionThing()

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

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
      return d.start*widthFactor
    })
    .attr("y", function(d, i){
      // return barHeight*i
      return 0
    })
    .attr("width", function(d){
      return (d.end-d.start)*widthFactor
    })
    .attr("height", barHeight)
    // .style("fill", "none")
    .style("stroke", "black")
    .attr("class", function(d){
      return "segment_"+d.segment
    })

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d, i){
      return d.start*widthFactor
    })
    .attr("y", function(d, i){
      // return barHeight*i
      return barHeight
    })
    .text(function(d){
      return d.segment
    })



})