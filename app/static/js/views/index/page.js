define([
  'jquery',
  'lodash',
  'backbone',
  'impress',
  'text!templates/index/page.html'
], function($, _, Backbone, Impress, indexPageTemplate, Impress){
  var IndexPage = Backbone.View.extend({
    el: '.container',
    render: function () {
      window.location = '/#!/core';
    }
  });
  return IndexPage;
});

