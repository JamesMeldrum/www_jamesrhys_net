define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/products/detail.html',
  'models/products/productDetail',
  'bjqs'
], function($, _, Backbone, optimizePageTemplate,productDetailModel,bjqs){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    events:{
      "click a.detailLink" : "renderDetail",
      "click .prodNav#back" : "closeDetail"
    },
    model : {},
    nextDisabled : false,
    prevDisabled : false,
    initialize: function(slug_title){
      this.model = new productDetailModel(slug_title);
      this.model.req_title = slug_title.replace('-',' ');
      this.model.on('load_complete', function(){this.renderDetail();},this);
      this.model.getDetail();
    },
    closeDetail: function(){
      $('.prodDetail').animate({
        'margin-left':'980px',
        'opacity': 'toggle'
        },1000,function(){
          window.location.href='http://127.0.0.1:8000/#!/prod';
      });
    },
    renderDetail: function(){
      
    },
    renderProducts: function(){
      console.log("Products render call");
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
    }
  });
  return OptimizePage;
});

