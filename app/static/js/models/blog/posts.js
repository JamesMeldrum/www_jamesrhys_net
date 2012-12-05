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
      't' : 'date',
      'p' : 'date',
      'b' : (((new Date().getDate().toString()).length == 2)?(new Date().getDate().toString()):"0"+(new Date().getDate().toString()))
                + (((new Date().getMonth().toString()).length == 2)?(new Date().getMonth().toString()):"0"+(new Date().getMonth().toString()))
                + new Date().getFullYear().toString()
    },
    defaults: {
      blog_id: "",
      date: "",
      title: "",
      subtitle: "",
      body: "",
      tags: []
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
    postFetch : function(model,response, options) {
      console.log(response);
      if(response.length !=0){
        model.request_paras.b = response[0].fields.date_published.slice(5,7)+response[0].fields.date_published.slice(8,10)+response[0].fields.date_published.slice(0,4)
        model.set({blog_id:response[0].pk,
                  title:response[0].fields.title,
                  date: response[0].fields.date_published.slice(5,7) + " . "+response[0].fields.date_published.slice(8,10) + " . " +response[0].fields.date_published.slice(0,4),
                  subtitle: response[0].fields.subtitle,
                  body: response[0].fields.body});
        model.trigger('updated');
        model.probePrevPost();
        model.probeNextPost();
      }
    },
    initialize: function(){
      this.fetch({
        success: this.postFetch
      });
    }
  });
  return blogModel;

});
