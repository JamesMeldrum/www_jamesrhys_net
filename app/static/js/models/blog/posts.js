define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var blogModel = Backbone.Model.extend({
    urlRoot: '/api/blog',
    defaults: {
      blog_id: 1,
      date: new Date(),
      title: "Here is my big long important title",
      subtitle: "Here is the slightly longer but still quite important subtitle dog",
      body: "derp pargraph text is derp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text isderp pargraph text is derp",
      tags: ['carrot','apple','banana']
    },
    initialize: function(){
      console.log("blogModel init.");
    },
    getNext: function(blog_id){
      return 2;
    }

  });
  return blogModel;

});
