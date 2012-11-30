define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/index/page.html'
], function($, _, Backbone, indexPageTemplate){
  var IndexPage = Backbone.View.extend({
    el: '.page',
    render: function () {

      $(this.el).html(indexPageTemplate);
    }
  });
  return IndexPage;
});

