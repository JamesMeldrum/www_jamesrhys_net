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
    initialize: function(){
      this.model.on('load_complete', function(){this.renderLabs();},this);
    },
    render: function () {
      this.$el.html(optimizePageTemplate);
      this.renderLabs();
    },
    renderLabs: function(){
      console.log("Lab render call");
      $.each(this.model.attributes,function(key,val){
        if(key in [0,1,2,3,4,5]){
          $('.labsEntry#'+key).children('.labsTitle').html(val.fields.title);
          $('.labsEntry#'+key).parent().attr('href','http://127.0.0.1:8000/labs/'+val.pk);
        }
      });
      this.disablePrev();
      this.disableNext();
    },
    disableNext : function(){
      $('#next').css('cursor','none');
      $('#next').animate({
        opacity: 0.25,
      },200);
    },
    disablePrev : function(){
      $('#prev').css('cursor','none');
      $('#prev').animate({
        opacity: 0.25,
      },200);
    }
  });
  return OptimizePage;
});

