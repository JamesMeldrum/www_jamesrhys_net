define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  'text!templates/people/people.html'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
    },
    render: function () {
      $('meta[name=og\\:title]').attr('content','ColdCrescentInteractive - People');
      document.title = "ColdCrescentInteractive - People"
      $(this.el).html(layoutTemplate);
    },
  });
  return AppView;
});

// Events object. Bind anchor click events here

