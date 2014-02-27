var Data = {
  timelineTitle: "Song Structure",
  oneLiner: "How did song structure change over time lorem ipsum? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
  legendLine: "Strips of color within each song row represent song segment types:"
}

var App = Backbone.Router.extend({

  routes: {
    "song-structure": "songStructure",
    "authorship-and-collaboration": "authorship",
    "schedule": "schedule"
  },

  songStructure: function(){
    app.timelineTitle = "Song Structure"
    // if (ui) ui.remove()
    // var ui = new UI()
    if (timelineHeading) timelineHeading.remove()
    var timelineHeading = new TimelineHeading()
  },

  authorship: function(){
  },

  schedule: function(){
  },

})

var TimelineHeading = Backbone.View.extend({
  initialize: function(){
    this.render()
  },
  el: function(){
    return $('#meta-container')
  },
  template: function(attributes){
    var source = $('#meta-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  },
  render: function(){
    this.$el.html(this.template(metaData1))
    return this
  }
})





var UI = Backbone.View.extend({

  initialize: function(attributes){

    this.render({
      heading: new UI.Heading()
      // sidebar: new UI.Sidebar()
    });
  },

  el: function(){
    return $('#main-container')
  },

  render: function(sub_views){
    var self = this;
    this.$el.empty()

    _.each(this.sub_views, function(view){
      view.remove()
    })

    this.sub_views = sub_views

    _.each(this.sub_views, function(view){
      var view_el = view.render().$el
      self.$el.append(view_el)
    })
    return this;
  }
})


UI.Heading = Backbone.View.extend({
  initialize: function(){
  },
  render: function(){
    this.$el.html(this.template({
      timelineTitle: app.timelineTitle
    }))
    return this;
  },
  template: function(attributes){
    var source = $('#meta-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  }
})



$(function(){




  // var metaData1 = {
  //   timelineTitle: "Song Structure",
  //   oneLiner: "How did song structure change over time lorem ipsum? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.",
  //   legendLine: "Strips of color within each song row represent song segment types:"
  // }


    // instantiates app Router
  window.app = new App();
  window.metaData1 = Data;

  // required code to use Router
  Backbone.history.start();

  // var source = $('#meta-template').html();
  // var template = Handlebars.compile(source);
  // var templateData = template(metaData1);
  // $('#meta-container').append(templateData)

  var source = $('#legend-template').html();
  var template = Handlebars.compile(source);
  var templateData = template(metaData1);
  $('#legend-container').append(templateData)





  // var legend = Backbone.Model.extend({

  // })


})


