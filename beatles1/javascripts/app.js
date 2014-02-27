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
    // if (ui) ui.remove()
    // var ui = new UI()
    app.metaData = dataMaster.songStructure
    if (timelineHeading) timelineHeading.remove()
    var timelineHeading = new TimelineHeading()

    if (legend) legend.remove()
    var legend = new Legend()
  },

  authorship: function(){
    app.metaData = dataMaster.authorship
    if (timelineHeading) timelineHeading.remove()
    var timelineHeading = new TimelineHeading()

    if (legend) legend.remove()
    var legend = new Legend()
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
    this.$el.html(this.template(app.metaData))
    return this
  }
})


var Legend = Backbone.View.extend({
  initialize: function(){
    this.render()
  },
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





// var UI = Backbone.View.extend({

//   initialize: function(attributes){

//     this.render({
//       heading: new UI.Heading()
//       // sidebar: new UI.Sidebar()
//     });
//   },

//   el: function(){
//     return $('#main-container')
//   },

//   render: function(sub_views){
//     var self = this;
//     this.$el.empty()

//     _.each(this.sub_views, function(view){
//       view.remove()
//     })

//     this.sub_views = sub_views

//     _.each(this.sub_views, function(view){
//       var view_el = view.render().$el
//       self.$el.append(view_el)
//     })
//     return this;
//   }
// })


// UI.Heading = Backbone.View.extend({
//   initialize: function(){
//   },
//   render: function(){
//     this.$el.html(this.template({
//       timelineTitle: app.timelineTitle
//     }))
//     return this;
//   },
//   template: function(attributes){
//     var source = $('#meta-template').html();
//     var template = Handlebars.compile(source);
//     return template(attributes)
//   }
// })



$(function(){


    // instantiates app Router
  window.app = new App();

  // required code to use Router
  Backbone.history.start();


})


