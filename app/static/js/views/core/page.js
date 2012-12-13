define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/core/page.html'
], function($, _, Backbone, optimizePageTemplate){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    events:{
      'click a.coreNav' : 'coreNavClicked',
      'click div.methodNav' : 'coreMethodClicked',
      'click .floatOutSlide' : 'coreMethodClosed'
    },
    coreMethodClicked : function(e){
      var req_id = e.currentTarget.id;
      $('.floatOutPanel').fadeIn();
      $('.floatOutSlide#'+req_id).fadeIn();
    },
    coreMethodClosed: function(e){
      var req_id = e.currentTarget.id;
      $('.floatOutPanel').fadeOut();
      $('.floatOutSlide#'+req_id).fadeOut();
    },
    coreNavClicked : function(e){
  
      // Toggle view classes

      $('ul.coreNav').children().each(function(ndx, el){
        $(el).children('a.coreNav').removeClass('active');
      });
      $(e.currentTarget).addClass('active');


      // Navigate downwaaards
      var req_el = $(e.currentTarget).attr('id'),
      target_el_scroll = Math.floor($('.DataPanelSection#'+req_el).offset().top - $('.DataPanelSection#introduction').offset().top);
      $('.DataPanel').animate({
        scrollTop : target_el_scroll
      },500);
    },
    render: function () {
      this.$el.html(optimizePageTemplate);
    },
  });
  return OptimizePage;
});
