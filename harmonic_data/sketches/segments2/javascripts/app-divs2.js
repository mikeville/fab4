//hide labels until hover
//group hover
//other features to lsit



TimelineStructure1 = function(){

  var dataset = dataSegments

  var initialize = function(){
    _.each(dataset, function(albumData){
      album = new Album(albumData)

      _.each(albumData.tracks, function(trackData){
        track = new Track(trackData)
        d3Maker(trackData.segments)
      })

    })
    console.log("this is the album:"+album)
  }

  var d3Maker = function(segmentData){
    _.each(segmentData, function(segment){
      console.log("----- ----- "+segment.segment)
    })

  }

  initialize()
}


Album = function(albumData){
  console.log("appending: "+albumData.albumTitle)
}

Track = function(trackData){
  console.log("-----appending: "+trackData.trackTitle)
}





$(function(){

  timeline = new TimelineStructure1()

})
