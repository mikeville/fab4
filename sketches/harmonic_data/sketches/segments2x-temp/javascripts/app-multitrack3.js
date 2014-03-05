$(function(){


var dataset = dataRevolverSegments

var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


var barHeight = 40
var widthFactor = 7
var paddingVert = 10

var barStack = svg.selectAll("g")
          .data(dataRevolverSegments.tracks)
          .enter()
          .append("svg:g")
          .attr("transform", function(d, i){
            return "translate(0," + (i*(barHeight+paddingVert)) + ")"
          })


barStack.selectAll("rect")
    .data(function(d, i){
      return dataset.tracks[i].segments
    })
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
    .style("stroke", "white")
    .attr("class", function(d){
      return "segment_"+d.segment
    })

// svg.selectAll("rect")
//     .data(function(d, i){
//       return dataset.tracks[i]
//     })
//     .enter()
//     .append("rect")
//     .attr("x", function(d){
//       return 0
//     })
//     .attr("y", function(d){
//       return i*(barHeight+paddingVert)
//     })
//     .attr("width", function(d){
//       return d.order*50
//     })
//     .attr("height", function(d){
//       return barHeight
//     })
//     .style("fill", "black")

barStack.selectAll("text")
    .data(function(d, i){
      return dataset.tracks[i].segments
    })
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

svg.selectAll("text")
    .data(function(d, i){
      return dataset.tracks
    })
    .enter()
    .append("text")
    .attr("x", function(d){
      return 0
    })
    .attr("y", function(d, i){
      return i*barHeight
    })
    .text(function(d, i){
      return d.track_title
    })

// this works but multi titles overlaid:
// barStack.selectAll("text")
//     .data(function(d, i){
//       return dataset.tracks
//     })
//     .enter()
//     .append("text")
//     .attr("x", function(d){
//       return 0
//     })
//     .attr("y", function(d){
//       return 0
//     })
//     .text(function(d, i){
//       return d.track_title
//     })


// svg.selectAll("text")
//           .data(dataRevolverSegments.tracks)
//           .enter()
//           .append("text")
//           .attr("x", function(d){
//             return 0
//           })
//           .attr("y", function(d){
//             return i*(barHeight+paddingVert)
//           })
//           .text(function(d){
//             return d.track_title
//           })
//           .attr("class", "track_title");



// barStack.selectAll("text")
//     .data(function(d, i){
//       return dataRevolverSegments.tracks
//     })
//     .enter()
//     .append("text")
//     .attr("x", function(d){
//       return 0
//     })
//     .attr("y", function(d){
//       return 0
//     })
//     .text(function(d){
//       return d.track_title
//     })
//     .attr("class", "track_title")


})
