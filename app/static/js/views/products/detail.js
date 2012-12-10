define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/products/detail.html',
  'models/products/productDetail',
  'bjqs',
  'templates/products/detail_list_item',
  'templates/products/image_list_item'
], function($, _, Backbone, optimizePageTemplate,productDetailModel,bjqs,detail_list_item,image_list_item){
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
      this.render();
      this.model = new productDetailModel(slug_title);
      this.model.req_title = slug_title;
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
    
     // Render:
      // body

      $('#body').html(this.model.attributes.prod.body);

      // Technologies
      $.each(this.model.attributes.prod.technologies.split(', '),function(ndx,val){
        $('ul.standardList#technologies').append(detail_list_item({list_val:val}));
      });

      // Goals
      $.each(this.model.attributes.prod.goals.split(', '),function(ndx,val){
        $('ul.standardList#goals').append(detail_list_item({list_val:val}));
      });

      // title
      $('#title').html(this.model.attributes.prod.title);

      // Date desc
      $('#date_description').html(this.model.attributes.prod.date_description);

      // Tags
      $.each(this.model.attributes.prod.tags,function(ndx,val){
        $('ul.standardList#tags').append(detail_list_item({list_val:val.fields.title}));
      });
      // IMAGES 
      if(this.model.attributes.prod.images.length){
        $.each(this.model.attributes.prod.images,function(ndx,val){
          console.log(ndx);
          console.log(val);
          $('ul.bjqs').append(image_list_item({url:val.fields.image}));
        });

        // BJQS script
    
        var BJQSInject = document.createElement('script');
        BJQSInject.type = 'text/javascript';
        BJQSInject.src = '/static/js/libs/bjqs/client.js';
        var BJQSClient = document.body;
        BJQSClient.appendChild(BJQSInject,BJQSClient);
      }else{
        $('.prodSlideCont').remove();
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
    render: function () {
      this.$el.html(optimizePageTemplate);
    }
  });
  return OptimizePage;
});

