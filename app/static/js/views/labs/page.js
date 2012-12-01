define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/labs/page.html'
], function($, _, Backbone, optimizePageTemplate){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    render: function () {
      this.$el.html(optimizePageTemplate);
    }
  });
  return OptimizePage;
});

