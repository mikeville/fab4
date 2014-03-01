//hide labels until hover
//group hover
//other features to lsit



TimelineStructure1 = function(){

  var dataset = dataSegments

  var initialize = function(){
    albumMaker()
    trackMaker()
    d3Maker()
  }

  var albumMaker = function(){
    console.log("appending the album")
  }

  var trackMaker = function(){
    console.log("appending the tracks to album")
  }

  var d3Maker = function(){
    console.log("adding d3")
  }

  initialize()
}










$(function(){

  timeline = new TimelineStructure1()

})
