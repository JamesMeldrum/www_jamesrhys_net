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
      return ret_url; // Set up API so the default action is to get the latest, getEntry takes an id or title - type check on server
    },
    request_paras : {
      't' : 'all',
      'p' : '',
      'b' : ''
    },
    defaults: {
      all : []
    },
    getAll : function(){
      console.log("All requested");
      this.fetch({
        success: this.postFetch;
      });
    },
    getPrevPost : function(){
      that = this;
      this.last_request = 'prev';
      this.request_paras.p = 'prev'; 
      this.fetch({
        success: that.postFetch
      });
    },
    getNextPost : function(){
      that = this;
      this.last_request = 'next';
      this.request_paras.p = 'next'; 
      this.fetch({
        success: that.postFetch
      });
    },
    probePrevPost: function(){
      this.last_request = 'prev';
      this.request_paras.p = 'prev'; 
      this.fetch({
        success: function(model, response,options){
          if(response.length ==0){
            model.trigger("noPrevPosts");
          }else{
            model.trigger("prevPosts");
          }
        }
      });
    },
    probeNextPost: function(){
      this.last_request = 'next';
      this.request_paras.p = 'next'; 
      this.fetch({
        success: function(model, response,options){
          if(response.length ==0){
            model.trigger("noNextPosts");
          }else{
            model.trigger("nextPosts");
          }
        }
      });
    },

    last_request : "next",
    postFetch : function(model,response, options
    {
      console.log(response);
    },
    initialize: function(){
      this.fetch({
        success: this.postFetch
      });
    }
  });
  return blogModel;

});
