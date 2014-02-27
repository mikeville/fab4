var dataMaster = {
  songStructure: {
    timelineTitle: 'Song Structure',
    oneLiner: 'How did song structure change over time lorem ipsum? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
    legendLine: 'Strips of color within each song row represent song segment types:'
  },
  authorship: {
    timelineTitle: 'Authorship',
    oneLiner: 'How did did the balance of authorship shift as Lennon, McCartney, and the dark horse Harrison evolved as songwriters?',
    legendLine: 'Each color in the collabo-meter stands for a band member:' 
  }
}


var App = Backbone.Router.extend({

  routes: {
    'song-structure': 'songStructure',
    'authorship-and-collaboration': 'authorship',
    'schedule': 'schedule'
    //go to error page if these aren't found? or redirect to home page?
  },

  songStructure: function(){
    app.metaData = dataMaster.songStructure
    app.uiMaker()
  },

  authorship: function(){
    app.metaData = dataMaster.authorship
    app.uiMaker()
  },

  schedule: function(){
  },

  uiMaker: function(){
    if (ui) ui.remove()
    var ui = new UI()
  }

})


var UI = Backbone.View.extend({
  initialize: function(){
    this.render({
      timelineHeading: new UI.TimelineHeading,
      legend: new UI.Legend
    });
  },
  render: function(sub_views){
    _.each(sub_views, function(view){
      view.$el.empty()
      view.render()
    })
    return this;
  }
})

UI.TimelineHeading = Backbone.View.extend({
  el: function(){
    return $('#meta-container')
  },
  template: function(attributes){
    var source = $('#meta-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    return this
  }
})


UI.Legend = Backbone.View.extend({
  el: function(){
    return $('#legend-container')
  },
  template: function(attributes){
    var source = $('#legend-template').html();
    var template = Handlebars.compile(source);
    return template(attributes)
  },
  render: function(){
    this.$el.html(this.template(app.metaData))
    return this
  }
})


$(function(){
    // instantiates app Router
  window.app = new App();

  // required code to use Router
  Backbone.history.start();
})


