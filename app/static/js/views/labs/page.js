define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/labs/page.html',
  'models/labs/experiments',
  'templates/labs/list_item'
], function($, _, Backbone, optimizePageTemplate, experimentsModel, listItemTemplate){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    model : new experimentsModel,
    nextDisabled : false,
    prevDisabled : false,
    initialize: function(){
      this.model.on('load_complete', function(){this.renderList();},this);
      this.model.request_paras['t'] = 'all';
      this.model.request_paras['b'] = '';
      this.model.getAll();
    },
    render: function () {
      this.$el.html(optimizePageTemplate);
    },
    renderList: function(){
      this.disablePrev();
      this.disableNext();
      console.log(this.model.attributes);
      if($('.labsEntryCont').children().length == 0){
      $.each(this.model.attributes.all,function(ndx, talkObject){
        $(".labsEntryCont").append(listItemTemplate({title:talkObject.title, id:ndx, date:talkObject.date_published, href:'',thumbnail:talkObject.thumbnail}));
      });
      }
    },
    disableNext : function(){
      if(!this.nextDiabled){
        this.nextDisabled = true;
        $('#next').css('cursor','none');
        $('#next').animate({
          opacity: 0.25,
        },200);
      }
    },
    disablePrev : function(){
      if(!this.prevDiabled){
        this.prevDisabled = true;
        $('#prev').css('cursor','none');
        $('#prev').animate({
          opacity: 0.25,
        },200);
      }
    },
  });
  return OptimizePage;
});

