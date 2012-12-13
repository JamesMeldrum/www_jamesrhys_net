define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.pageParent',
    initialize: function () {
    },
    render: function () {
      var that = this;
      $(this.el).html(layoutTemplate);
    },
    bindPageEvents: function(){
      var active_page = window.location.href.slice(25);
      $('ul#nav li a.textTransform').removeClass('active');
      $('#'+active_page).addClass('active');

      $('ul#nav li a.textTransform').bind('click',function(e){
        var active_page = e.currentTarget.href.slice(25);
        $('ul#nav li a.textTransform').removeClass('active');
        $('#'+active_page).addClass('active');
      });

    }
  });
  return AppView;
});

// Events object. Bind anchor click events here
