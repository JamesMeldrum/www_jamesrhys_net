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
      0: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      },
      1: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      },
      2: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      },
      3: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      },
      4: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      },
      5: {
        id: "",
        title: "",
        description: "",
        date_started: "",
        date_published: "",
        tags: []
      }
    },
    getPrevPage : function(){
    },
    getNextPage: function(){
    },
    postFetch : function(model,response, options) {
      if(response.length !=0){
        for(var c = 0; c<response.length; c++){
          var exp_formatted = {
            id: response[""+c.toString()].pk,
            title: response[c].fields.title,
            description: response[c].fields.description,
            date_published: response[c].fields.date_published,
            tags: response[c].fields.tags
          };
          model.set({c:exp_formatted});
        }
        model.trigger('load_complete');
      }else{
        if(model.last_request == 'next'){
          model.trigger('noNextPosts');
        }else{
          model.trigger('noPrevPosts');
        }
        console.log("None left :(");
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

