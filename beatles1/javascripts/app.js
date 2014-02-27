$(function(){
  var metaData1 = {
    timelineTitle: "Song Structure",
    oneLiner: "How did song structure change over time lorem ipsum? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
    legendLine: "Strips of color within each song row represent song segment types:"
  }

  var source = $('#meta-template').html();
  var template = Handlebars.compile(source);
  var templateData = template(metaData1);
  $('#meta-container').append(templateData)

  var source = $('#legend-template').html();
  var template = Handlebars.compile(source);
  var templateData = template(metaData1);
  $('#legend-container').append(templateData)




  var router = Backbone.Router.extend({
    
  })

  var legend = Backbone.Model.extend({

  })


})

