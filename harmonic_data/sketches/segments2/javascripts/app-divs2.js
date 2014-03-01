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
  var source = $('#album-container-template').html();
  var template = Handlebars.compile(source)
  $('#timeline-container').append(template(albumData))
}

Track = function(trackData){
  var source = $('#track-container-template').html();
  var template = Handlebars.compile(source)
  $('#timeline-container').append(template(trackData))
}





$(function(){

  timeline = new TimelineStructure1()

})
