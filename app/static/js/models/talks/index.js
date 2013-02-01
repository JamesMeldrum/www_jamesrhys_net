define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var talksModel = Backbone.Model.extend({
    initialize: function(){
    },
    url: function(operation) {
      var ret_url = '/api/talks/get/q?';
      $.each(this.request_paras,function(key,val){
        ret_url += key+'='+val+'&';
      });
      return ret_url; 
    },
    request_paras : {
      't' : 'all',
      'b' : ''
    },
    defaults: {
      all : []
    },
    getAll: function(){
      this.fetch({
        success: this.postFetch
      });
    },
    getDetail: function(){
      this.fetch({
        success: this.postFetchDetail
      });
    },
    postFetchDetail : function(model,response,options){
      var formatted_talks = [];
      for(var i = 0; i<response.length; i++){
        var formatted_talk ={
            id: response[""+i.toString()].pk,
            title: response[i].fields.title,
            description: response[i].fields.description,
            body: response[i].fields.body,
            date: response[i].fields.date_published.slice(5,7) + '/' + 
                  response[i].fields.date_published.slice(8,10) + '/' +
                  response[i].fields.date_published.slice(0,4),
            tags: response[i].fields.tags,
            slide_deck_url: response[i].fields.slide_deck_url
        };
        var tags_string = '';
        $.each(response[i].fields.tags, function(ndx,el){
          tags_string += el.fields.title+', ';
        });
        tags_string = tags_string.slice(0,-2);
        formatted_talk.tags = tags_string;
        formatted_talks[i] = formatted_talk;
      }
      model.set({all:formatted_talks});
      model.trigger('load_complete');
    },
    postFetch : function(model,response,options){
      var formatted_talks = [];
      for(var i = 0; i<response.length; i++){
        var formatted_talk ={
            id: response[""+i.toString()].pk,
            title: response[i].fields.title,
            description: response[i].fields.description,
            date_published: response[i].fields.date_published.slice(5,7) + '/' + 
                  response[i].fields.date_published.slice(8,10) + '/' +
                  response[i].fields.date_published.slice(0,4),
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
