define([
  'jquery',
  'lodash',
  'backbone',
  'models/blog/posts'
], function($, _, Backbone, postsModel){
  var projectsCollection = Backbone.Collection.extend({
    model: postsModel,
    initialize: function(){

    }

  });

  return projectsCollection;
});

