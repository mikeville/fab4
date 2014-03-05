

$(function(){


var dataset = dataRevolverSegments

var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

var barHeight = 40
var widthFactor = 7
var paddingVert = 10

// var svg = d3.select("body")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height);

var svgSongRow = d3.select("body").selectAll("svg")
    .data(dataset.tracks)
  .enter()
    .append("svg")
    .attr("class", "song-row")
    .attr("width", width)
    .attr("height", barHeight)
  .append("g")
    .attr("transform", function(d, i) {return "translate(0,"+(i*barHeight)+")"})


// var g = svg.selectAll("g")
//     .data(dataset.tracks)
//   .enter()
//     .append("g")
//     .attr("width", width)
//     .attr("height", barHeight)

svgSongRow.append("text")
  .attr("x", 0)
  .attr("y", 35)
  .text(function(d) {return d.track_title})


svgSongRow.selectAll("rect")
  .data(function(d, i){
    return dataset.tracks[i].segments
  })
  .enter()
    .append("rect")
    .attr("x", function(d) { return d.start*widthFactor })
    .attr("y", 30)
    .attr("width", function(d) { return (d.end-d.start)*widthFactor })
    .attr("height", barHeight)
    .style("stroke", "white")
    .attr("class", function(d) { return "segment_"+d.segment })


// //append rows of divs, each with an svg, and one group
// var svgSongRow = d3.select("body").selectAll(".song-row")
//     .data(dataset.tracks)
//   .enter().append("div")
//     .attr("class", "song-row")
//   .append("svg")
//     .attr("width", width)
//     .attr("height", barHeight)
//   .append("g")


// add the segments to each group
// svgSongRow.selectAll("g")
//   .data(function(d, i){
//     return dataset.tracks[i].segments
//   })
//   .enter().append("rect")
//     .attr("x", function(d) { return d.start*widthFactor })
//     // .attr("y", function(d) { return barHeight*i })
//     .attr("y", function(d) { return 0 })
//     .attr("width", function(d) { return (d.end-d.start)*widthFactor })
//     .attr("height", barHeight )
//     .style("stroke", "white")
//     .attr("class", function(d) { return "segment_"+d.segment })

// //add labels over each segment
// svgSongRow.selectAll("text")
//   .data(function(d, i){
//     return dataset.tracks[i].segments
//   })
//   .enter().append("text")
//     .attr("x", function(d, i){
//       return d.start*widthFactor
//     })
//     .attr("y", function(d, i){
//       // return barHeight*i
//       return barHeight
//     })
//     .text(function(d){
//       return d.segment
//     })


// //add song titles


// svgSongRow.selectAll(".song-row")
//     .data(dataset)
//   .enter().append("text")
//     .attr("x", 0)
//     .attr("y", 10)
//     .text(function(d, i) { return d.tracks[i].track_title })


})
