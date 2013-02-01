define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/blog/page.html',
  'models/blog/posts',
  'templates/blog/list_item'
], function($, _, Backbone, optimizePageTemplate, blogModel,listItemTemplate){
  var BlogIndex = Backbone.View.extend({
    el: '.page',
    initialize: function(){
      this.model = new blogModel;
      this.model.on('load_complete',function(){this.renderList();},this);
      this.model.getAll();
    },
    model : {},
    events: {
      "click a.detailLink" : "renderDetail"
    },
    renderDetail: function(e){
      e.preventDefault();
      $('.blogsCont').animate({
        'margin-left':'-980px',
        'opacity': 'toggle'
      },500,function(){
        window.location.href=e.target.href;
      });
      $('.blogsDetail').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
        },1000,function(){
      });

    },
    closeDetail: function(e){
      $('.blogsCont').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
      },1000,function(){});
      $('.blogsDetail').animate({
        'margin-left':'980px',
        'opacity': 'toggle'
        },1000,function(){
          var talkCachedRef = $('.blogsDetail').children('.blogsPost');
          talkCachedRef.children('#title').html('');
          talkCachedRef.children('#subtitle').html('');
          talkCachedRef.children('#body').html('');
      });
    },
    enableNext : function(){
      $('#next').css('cursor','pointer');
      $('#next').animate({
        opacity: 1,
      },200);
    },
    enablePrev : function(){
      $('#prev').css('cursor','pointer');
      $('#prev').animate({
        opacity: 1,
      },200);
    },
    getPrevPost : function(){
      this.model.getPrevPost();
    },
    getNextPost : function(){
      this.model.getNextPost();
    },
    render: function () {
      this.$el.html(optimizePageTemplate);
    },
    renderList : function(){
      $('meta[name=og\\:title]').attr('content','ColdCrescentInteractive - DevBlog');
      document.title = "ColdCrescentInteractive - DevBlog"
      $.each(this.model.attributes.all,function(ndx, blogObject){
      if($('.blogsList').children('#'+ndx).length == 0){
        $(".blogsList").append(listItemTemplate({date: blogObject.date, title:blogObject.title,subtitle:blogObject.subtitle, id:ndx}));
      }
      });
    },
  });
  return BlogIndex;
});
