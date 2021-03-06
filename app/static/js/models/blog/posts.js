define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var blogModel = Backbone.Model.extend({
    url: function(operation) {
      var ret_url = '/api/blog/get/q?';
      $.each(this.request_paras,function(key,val){
        ret_url += key+'='+val+'&';
      });
      return ret_url; 
    },
    request_paras : {
      't' : 'all',
    },
    defaults: {
      all : []
    },
    getDetail : function(){
      this.fetch({
        success: this.postFetchDetail
      });
    },
    getAll : function(){
      this.fetch({
        success: this.postFetch
      });
    },
    postFetchDetail : function(model,response,options){
      var formatted_talks = [];
      for(var i = 0; i<response.length; i++){
        var formatted_talk ={
            id: response[""+i.toString()].pk,
            title: response[i].fields.title,
            subtitle: response[i].fields.subtitle,
            tags: response[i].fields.tags,
            body: response[i].fields.body,
            date: response[i].fields.date_published.slice(5,7) + '/' + 
                  response[i].fields.date_published.slice(8,10) + '/' +
                  response[i].fields.date_published.slice(0,4) 
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
            subtitle: response[i].fields.subtitle,
            tags: response[i].fields.tags,
            date: response[i].fields.date_published.slice(5,7) + '/' + 
                  response[i].fields.date_published.slice(8,10) + '/' +
                  response[i].fields.date_published.slice(0,4) 
        };
        formatted_talks[i] = formatted_talk;
      }
      model.set({all:formatted_talks});
      model.trigger('load_complete');
    },
    initialize: function(){}
  });
  return blogModel;
});
