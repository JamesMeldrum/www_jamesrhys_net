define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {
  var blogModel = Backbone.Model.extend({
    url: function(operation) {
      var ret_url = '/api/prod/get/q?';
      $.each(this.request_paras,function(key,val){
        ret_url += key+'='+val+'&';
      });
      return ret_url; 
    },
    request_paras : {
      't' : 'all'
    },
    defaults: {
      all : []
    },
    getAll : function(){
      this.fetch({
        success: this.postFetch
      });
    },
    postFetch : function(model,response, options) {
      var formatted_prods = [];
      for(var c = 0; c<response.length; c++){
        var formatted_prod = {
          id: response[""+c.toString()].pk,
          title: response[c].fields.title,
          date_description: response[c].fields.date_description,
          tags: response[c].fields.tags,
          href: "http://127.0.0.1:8000/#!/prod/" + response[c].fields.title.replace(' ','-'),
          thumbnail: response[c].fields.thumbnail
        };
        formatted_prods[c] = formatted_prod;
      }
      model.set({all:formatted_prods});
      model.trigger('load_complete');
    },
    initialize: function(){
    }
  });
  return blogModel;

});

