// EVENTS

var dataMaster

xhrTest = function(){
  console.log("we got data?:")
  console.log(dataMaster)
}


addNavEvents = function(){
  $("#nav-link-legend").on("click", function(e){
    e.preventDefault()
    $("#notes-container").hide()
    $("#legend-container").show()
  })
  $("#nav-link-notes").on("click", function(e){
    e.preventDefault()
    $("#legend-container").hide()
    $("#notes-container").show()
      .html("<p>Click tracks to read excerpts from Alan W. Pollack's <a href='http://www.icce.rug.nl/~soundscapes/DATABASES/AWP/awp-notes_on.shtml'>'Notes on...'</a> series</p>")
  })
  $("#nav-link-hide").on("click", function(e){
    e.preventDefault()
    $("#legend-container").hide()
    $("#notes-container").hide()
  })
  $("#sort-link-album").on("click", sortByAlbum)
  $("#sort-link-recording").on("click", function(e){
    e.preventDefault;
    $("#timeline-container").empty();
    TimeLineStructureRecordingDate();
  })
}

sortByAlbum = function(){
  console.log("album sort")
}




// RESPONSIVENESS

ssmTest = function(){
  ssm.addStates([
  {
    id: 'mobile',
    maxWidth: 640,
    onEnter: function(){
      contextModuleToMobile();
    }
  },
  {
    id: 'tablet-desktop',
    minWidth: 640,
    onEnter: function(){
      contextModuleToSidebar();
    }
  }
  ]).ready()
}

contextModuleToSidebar = function(){
  $("#context-module").removeClass("context-module-mobile")
    .addClass("context-module-desktop")
    // .css("float", "right")
  $('#timeline-container').addClass("timeline-container-desktop")
  $('#nav-link-hide').hide();

}

contextModuleToMobile = function(){
  $("#context-module").removeClass("context-module-desktop")
  $('#timeline-container').removeClass("timeline-container-desktop")
  $('#context-module').addClass("context-module-mobile")
  $('#nav-link-hide').show();
}






// SORT TRACKS BY DATE

sortTracksByDate = function(){

  dataParse = function() {
    var dataset = dataSegments

    var tracksByDate = []
    _.each(dataset, function(albumData){
      _.each(albumData.tracks, function(trackData){
        // track(trackData, albumData)
        // d3Maker(trackData)
        var trackIndex = function(){return trackData.trackIndex }
        tracksByDate.push({trackIndex: trackData})
      })

    })

    // console.log(tracksByDate)
    TimeLineStructureRecordingDate(tracksByDate)
  }


  TimeLineStructureRecordingDate = function(tracksByDate){

    var self = this

    var dataset = dataSegments

    var initialize = function(){
    }

    var trackMaker =function(trackData){
      // var albumKey = albumData.albumKey
      var source = $('#track-container-template').html();
      var template = Handlebars.compile(source)
      $("#timeline-container").append(template(trackData.trackIndex))

      // $(".track-"+trackData.trackIndex).on("click", function(){
      //   updateNotes(trackData)
      // })
    }

    var d3Maker2TEMP = function(trackData){


      var ratioFactor = 30
      var width = $("#timeline-container").width();
      var height = width/ratioFactor
      // var maxBarWidth = 502.200 //data's time length for Reovlution 9. todo: change to carnival's long length or make this programmatic using d3's .max method
      var maxBarWidth = 290 //adjusting for while my guitar gently weeps

      // var barHeight = width/20 //todo: fix bug for floating text weird height gaps
      var widthFactor = width/maxBarWidth //1.35 factor from 384 px wide on guitar weep

      var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
        // .attr("width", width)
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 "+width+" "+height)
        .attr("width", width)
        .attr("height", height)

      svg.selectAll("rect")
          .data(trackData.segments)
        .enter().append("rect")
          .attr("x", function(d) { return d.start*widthFactor })
          .attr("y", 0)
          .attr("width", function(d) { return (d.end-d.start)*widthFactor})
          .attr("height", height)
          .style("stroke", "white")
          .attr("class", function(d) { return "segment_"+d.segment })

    }

    _.each(tracksByDate, function(trackData){
      trackMaker(trackData)
      d3Maker2TEMP(trackData.trackIndex)
    })


    }

  dataParse()

}


// MICRO BY DATE

sortTracksByDateMicro = function(){

  dataParseMicro = function() {
    var dataset = dataSegments

    var tracksByDate = []
    _.each(dataset, function(albumData){
      _.each(albumData.tracks, function(trackData){
        // track(trackData, albumData)
        // d3Maker(trackData)
        var trackIndex = function(){return trackData.trackIndex }
        tracksByDate.push({trackIndex: trackData})
      })

    })

    // console.log(tracksByDate)
    TimeLineStructureRecordingDateMicro(tracksByDate)
  }


  TimeLineStructureRecordingDateMicro = function(tracksByDate){

    var self = this

    var dataset = dataSegments

    var initialize = function(){
    }

    var trackMakerMicro =function(trackData){
      // var albumKey = albumData.albumKey
      var source = $('#micro-track-container-template').html();
      var template = Handlebars.compile(source)
      $("#micromacro-container").append(template(trackData.trackIndex))

      // $(".track-"+trackData.trackIndex).on("click", function(){
      //   updateNotes(trackData)
      // })
    }

  var d3Maker2TEMPMicro = function(trackData){


    var ratioFactor = 160
    var width = $("#timeline-container").width();
    var height = width/ratioFactor
      // var maxBarWidth = 502.200 //data's time length for Reovlution 9. todo: change to carnival's long length or make this programmatic using d3's .max method
      var maxBarWidth = 290 //adjusting for while my guitar gently weeps

      // var barHeight = width/20 //todo: fix bug for floating text weird height gaps
      var widthFactor = width/maxBarWidth //1.35 factor from 384 px wide on guitar weep

      var svg = d3.select(".micro-track-"+trackData.trackIndex).append("svg")
        // .attr("width", width)
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 "+width+" "+height)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "micro-svg")

      svg.selectAll("rect")
          .data(trackData.segments)
        .enter().append("rect")
          .attr("x", function(d) { return d.start*widthFactor })
          .attr("y", 0)
          .attr("width", function(d) { return (d.end-d.start)*widthFactor})
          .attr("height", height)
          // .style("stroke", "white")
          .attr("class", function(d) { return "segment_"+d.segment })

    }

    _.each(tracksByDate, function(trackData){
      trackMakerMicro(trackData)
      d3Maker2TEMPMicro(trackData.trackIndex)
    })


  }

  dataParseMicro()

}








// SORT TRACKS BY ALBUM


TimelineStructure1 = function(){

  var self = this
  self.maxWidth = 0

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

    $(".track-"+trackData.trackIndex).on("click", function(){
      updateNotes(trackData)
    })
  }

  var updateNotes = function(trackData){
    $("#legend-container").hide()
    $("#notes-container").show()
    var source = $('#notes-template').html();
    var template = Handlebars.compile(source)
    $('#notes-container').html(template(trackData))
  }

  var d3Maker = function(trackData){


  var ratioFactor = 30
  var width = $("#timeline-container").width();
  var height = width/ratioFactor
    // var maxBarWidth = 502.200 //data's time length for Reovlution 9. todo: change to carnival's long length or make this programmatic using d3's .max method
    var maxBarWidth = 290 //adjusting for while my guitar gently weeps

    // var barHeight = width/20 //todo: fix bug for floating text weird height gaps
    var widthFactor = width/maxBarWidth //1.35 factor from 384 px wide on guitar weep

    var svg = d3.select(".track-"+trackData.trackIndex).append("svg")
      // .attr("width", width)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 "+width+" "+height)
      .attr("width", width)
      .attr("height", height)

    svg.selectAll("rect")
        .data(trackData.segments)
      .enter().append("rect")
        .attr("x", function(d) { return d.start*widthFactor })
        .attr("y", 0)
        .attr("width", function(d) { return (d.end-d.start)*widthFactor})
        .attr("height", height)
        .style("stroke", "white")
        .attr("class", function(d) { return "segment_"+d.segment })

  }

  initialize()
}

legendNavHider = function(){
  // $("#context-nav").show()
  // console.log("sticking")
}



$(function(){

  // timeline = new TimelineStructure1()
  // sortTracksByDateMicro()
  // sortTracksByDate()

  d3.json("/javascripts/dataSegments.json", function(error, json) {
    if (error) return console.warn(error);
    dataMaster = json;
    xhrTest();
  })
  
  $(window).resize(function() {
  var ratioFactor = 30
  var width = $("#timeline-container").width();
  var height = width/ratioFactor
  d3.selectAll("svg").attr("width", width);
  d3.selectAll("svg").attr("height", height);
  });

  // $("#context-nav").hide()

  $("#context-module").stick_in_parent()
    .on("sticky_kit:stick", function(e){
      legendNavHider();
    })

  ssmTest()

  addNavEvents()

  

})
