define([
  'jquery',
  'lodash',
  'backbone',
  'impress',
  'text!templates/index/page.html'
], function($, _, Backbone, Impress, indexPageTemplate, Impress){
  var IndexPage = Backbone.View.extend({
    el: '.page',
    render: function () {
      $(this.el).html(indexPageTemplate);
      impress().init(); // Call to global - BAD BAD BAD
    }
  });
  return IndexPage;
});

