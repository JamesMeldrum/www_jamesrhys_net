define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/labs/page.html',
  'models/labs/experiments'
], function($, _, Backbone, optimizePageTemplate, experimentsModel){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    model : new experimentsModel,
    nextDisabled : false,
    prevDisabled : false,
    initialize: function(){
      this.model.on('load_complete', function(){this.renderLabs();},this);
    },
    render: function () {
      this.$el.html(optimizePageTemplate);
      this.renderLabs();
    },
    renderLabs: function(){
      this.disablePrev();
      this.disableNext();
      $.each(this.model.attributes,function(key,val){
        if(key in [0,1,2,3,4,5]){
          if(typeof val.fields != 'undefined'){
            $('.labsEntry#'+key).children('.labsTitle').html(val.fields.title);
            $('.labsEntry#'+key).parent().attr('href','http://127.0.0.1:8000/labs/'+val.pk);
            $('.labsEntry#'+key).fadeIn();
          }else{
            $('.labsEntry#'+key).fadeOut();
          }
        }
      });
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

