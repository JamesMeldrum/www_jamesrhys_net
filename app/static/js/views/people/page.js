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
      $(this.el).html(layoutTemplate);
    },
  });
  return AppView;
});

// Events object. Bind anchor click events here

