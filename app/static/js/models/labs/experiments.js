define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var blogModel = Backbone.Model.extend({
    url: function(operation) {
      var ret_url = '/api/lab/get/q?';
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
      all: []
    },
    postFetch : function(model,response, options) {
      var formatted_talks = [];
      for(var i = 0; i<response.length; i++){
        var formatted_talk ={
            id: response[""+i.toString()].pk,
            title: response[i].fields.title,
            body: response[i].fields.body,
            date_published: response[i].fields.date_published.slice(5,7) + '/' + 
                  response[i].fields.date_published.slice(8,10) + '/' +
                  response[i].fields.date_published.slice(0,4),
            tags: response[i].fields.tags,
            thumbnail: response[i].fields.thumbnail
        };
        formatted_talks[i] = formatted_talk;
      }
      model.set({all:formatted_talks});
      model.trigger('load_complete');
    },
    
    getAll : function(){
      this.fetch({
        success: this.postFetch
      });
    }
  });
  return blogModel;

});

