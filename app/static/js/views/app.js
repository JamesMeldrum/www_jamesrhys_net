/*
*
*   Author: James Meldrum
*   Date: 11/30/2012
*   Desc: Main template for site. Only gets loaded once, async's other data as needed.
*
*/

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
    }
  });
  return AppView;
});
