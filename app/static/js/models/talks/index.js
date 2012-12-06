define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var talksModel = Backbone.Model.extend({
    initialize: function(){
    },
    url: function(operation) {
      return '/api/talks/get/q?t=all&';
    },
    defaults: {
      all : []
    },
    getAll: function(){
      console.log("All requested");
      this.fetch({
        success: this.postFetch
      });
    },
    getDetail: function(){},
    postFetch : function(model,response,options){
      var formatted_talks = [];
      for(var i = 0; i<response.length; i++){
        var formatted_talk ={
            id: response[""+i.toString()].pk,
            title: response[i].fields.title,
            description: response[i].fields.description,
            date_published: response[i].fields.date_published,
            tags: response[i].fields.tags,
            slide_deck_url: response[i].fields.slide_deck_url
        };
        formatted_talks[i] = formatted_talk;
      }
      model.set({all:formatted_talks});
      model.trigger('load_complete');
    }
  });
  return talksModel;
});
