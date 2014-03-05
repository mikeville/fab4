

$(function(){


var dataset = dataRevolverSegments

var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

var barHeight = 15
var widthFactor = 4
var paddingVert = 10
var textPadding = 15

var g = d3.select("body").selectAll("svg")
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
  .text(function(d) {return d.track_title})


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
    .attr("y", textPadding*2)
    .attr("width", function(d) { return (d.end-d.start)*widthFactor })
    .text( function(d) { return d.segment})

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
