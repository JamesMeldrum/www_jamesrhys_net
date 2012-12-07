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
      't' : 'id',
      'qn' : '6',
      'b' : '1'
    },
    defaults: {
      all : []
    },
    getAll : function(){
      console.log("All requested.");
      this.fetch({
        success: this.postFetch
      });
    },
    getPrevPage : function(){
    },
    getNextPage: function(){
    },
    postFetch : function(model,response, options) {
      var formatted_prods = [];
      for(var c = 0; c<response.length; c++){
        var formatted_prod = {
          id: response[""+c.toString()].pk,
          title: response[c].fields.title,
          description: response[c].fields.description,
          date_published: response[c].fields.date_published,
          tags: response[c].fields.tags
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

