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
      'qn' : '1',
      'b' : ''
    },
    req_title:'',
    defaults: {
      prod : {}
    },
    getDetail : function(){
      console.log("Detail requested.");
      console.log(this.req_title);
      this.request_paras.b = this.req_title;
      this.fetch({
        success: this.postFetch
      });
    },
    getPrevPage : function(){
    },
    getNextPage: function(){
    },
    postFetch : function(model,response, options) {
      var formatted_prod = {
        id: response[0].pk,
        title: response[0].fields.title,
        description: response[0].fields.description,
        date_published: response[0].fields.date_published,
        tags: response[0].fields.tags
      };
      model.set({prod:formatted_prod});
      model.trigger('load_complete');
    },
  });
  return blogModel;

});

