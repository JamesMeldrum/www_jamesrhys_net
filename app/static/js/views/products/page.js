define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/products/page.html',
  'models/products/products'
], function($, _, Backbone, optimizePageTemplate,productsModel){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    events:{
      "click a.detailLink" : "renderDetail",
      "click .talksNav#back" : "closeDetail"
    },
    model : {},
    nextDisabled : false,
    prevDisabled : false,
    initialize: function(){
      this.model = new productsModel;
      this.model.on('load_complete', function(){this.renderProducts();},this);
      this.model.getAll();
    },
    closeDetail: function(){},
    renderDetail: function(){},
    renderProducts: function(){
      this.disablePrev();
      this.disableNext();
      $.each(this.model.attributes,function(key,val){
        if(key in [0,1,2,3,4,5]){
          if(typeof val.fields != 'undefined'){
            $('.labsEntry#'+key).children('.labsTitle').html(val.fields.title);
            $('.labsEntry#'+key).parent().attr('href','http://127.0.0.1:8000/#!/prod/'+val.fields.title);
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
    render: function () {
      this.$el.html(optimizePageTemplate);
      this.renderProducts();
    }
  });
  return OptimizePage;
});

