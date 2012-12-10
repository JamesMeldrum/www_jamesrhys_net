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
      't' : 'title',
      'b' : ''
    },
    req_title: '',
    defaults: {
      prod : {}
    },
    getDetail : function(){
      console.log("getDetail");
      this.request_paras.b = this.req_title;
      this.fetch({
        success: this.postFetch
      });
    },
    getPrevPage : function(){
    },
    getNextPage: function(){
    },
    intiailize: function(slug_title){
      this.req_title = slug_title;
    },
    postFetch : function(model,response, options) {
      console.log("PostFetch detail");
      console.log(response);
      var formatted_prod = {
        id: response[0].pk,
        title: response[0].fields.title,
        goals: response[0].fields.goals,
        technologies: response[0].fields.technologies,
        body: response[0].fields.body,
        date_description: response[0].fields.date_description,
        tags: response[0].fields.tags,
        images: response[0].fields.images
      };
      model.set({prod:formatted_prod});
      model.trigger('load_complete');
    },
  });
  return blogModel;

});

