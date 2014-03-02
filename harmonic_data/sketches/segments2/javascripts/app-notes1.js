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


ssmTest = function(){
  ssm.addStates([
  {
    id: 'mobile-tablet',
    maxWidth: 1024,
    onEnter: function(){
      contextModuleToMobile();
    }
  },
  {
    id: 'desktop',
    minWidth: 1024,
    onEnter: function(){
      contextModuleToSidebar();
    }
  }
  ]).ready()
}

contextModuleToSidebar = function(){
  $("#context-module").removeClass("context-module-mobile")
  $("#context-module").addClass("context-module-desktop")
  $('#timeline-container').addClass("timeline-container-desktop")
  // $('#timeline-container').css("background-color", "black")
}

contextModuleToMobile = function(){
  $("#context-module").removeClass("context-module-desktop")
  $('#timeline-container').removeClass("timeline-container-desktop")
  $('#context-module').addClass("context-module-mobile")

}

$(function(){

  timeline = new TimelineStructure1()
  
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

})
