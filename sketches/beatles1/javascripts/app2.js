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
  },
  schedule: {
    timelineTitle: 'Working Schedule',
    oneLiner: 'How did their day-to-day grind change over time?',
    legendLine: 'Each color represents a working activity:' 
  },
  inTheStudio: {
    timelineTitle: 'In The Studio',
    oneLiner: 'How many days of recording went into each song?',
    legendLine: 'Each line is a length of something lorem ipsum:' 
  },
  lyricalSyntax: {
    timelineTitle: 'Lyrical Syntax',
    oneLiner: 'How did their lyrics evolve?',
    legendLine: 'Song title color lorem ipsum:' 
  },
  selfReference: {
    timelineTitle: 'Self Reference',
    oneLiner: 'When did The Beatle’s lyrics points back to previous songs?',
    legendLine: 'Arrows point from the the song with the refering lyric back to the lorem ipsum.' 
  }
}


var App = Backbone.Router.extend({

  routes: {
    'song-structure': 'songStructure',
    'authorship-and-collaboration': 'authorship',
    'working-schedule': 'schedule',
    'in-the-studio': 'inTheStudio',
    'lyrical-syntax': 'lyricalSyntax',
    'self-reference': 'selfReference'
    //go to error page if these aren't found? or redirect to home page?
  },

  songStructure: function(){
    //if data hasn't been prepared...prepare it...then set it to the metaData thing.
    app.metaData = dataMaster.songStructure
    app.uiMaker()
  },

  authorship: function(){
    app.metaData = dataMaster.authorship
    app.uiMaker()
  },

  schedule: function(){
    app.metaData = dataMaster.schedule
    app.uiMaker()
  },

  inTheStudio: function(){
    app.metaData = dataMaster.inTheStudio
    app.uiMaker()
  },

  lyricalSyntax: function(){
    app.metaData = dataMaster.lyricalSyntax
    app.uiMaker()
  },

  selfReference: function(){
    app.metaData = dataMaster.selfReference
    app.uiMaker()
  },

  uiMaker: function(){
    if (ui) ui.remove()
    var ui = new UI()
    //draw D3
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


