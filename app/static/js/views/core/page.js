/*
*
*   Need more shit in here:
*     * Resume
*     * Twitter shit
*     * Other social network shit
*     * Shit from old site
*     * Shit shit shit
*      
*
*/


define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/core/page.html'
], function($, _, Backbone, optimizePageTemplate){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    render: function () {
      this.$el.html(optimizePageTemplate);
    }
  });
  return OptimizePage;
});
