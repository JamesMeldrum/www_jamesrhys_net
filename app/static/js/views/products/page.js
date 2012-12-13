define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/products/page.html',
  'models/products/products',
  'templates/products/list_item'
], function($, _, Backbone, optimizePageTemplate,productsModel,listItemTemplate){
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
      this.model.on('load_complete', function(){this.renderList();},this);
      this.model.getAll();
    },
    closeDetail: function(){

    },
    renderDetail: function(e){
      e.preventDefault();
      var e_href = (e.currentTarget.href);

      $('.labsPage').animate({
        'margin-left':'-980px',
        'opacity': 'toggle'
        },1000,function(){
          window.location.href=e_href;
      });
    },
    renderList: function(){
      this.disablePrev();
      this.disableNext();
      $.each(this.model.attributes.all,function(ndx,prodObject){
        $('.labsEntryCont').append(listItemTemplate({id:prodObject.id, title:prodObject.title, date_description:prodObject.date_description, tags:prodObject.tags, thumbnail:prodObject.thumbnail,href:prodObject.href})); 
      });
      $('.labsEntry').each(function(ndx,el){
        $(el).fadeIn();
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
    }
  });
  return OptimizePage;
});

