define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var productModel = Backbone.Model.extend({
    urlRoot: '/api/prod',
    defaults: {
      prod_id: 1,
      prod_url: 'http://www.google.com',
      date_started: 8
      date_released: 10,
      title: "Title",
      subtitle: "Subtitle",
      body: "derp",
      tags: ['a','b','c']
      images: ['derp.txt','derp2.txt']
    },
    initialize: function(){
      console.log("blogModel init.");
    },
    getNext: function(blog_id){
      return 2;
    }
  });
  return productModel;
});

