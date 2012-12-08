define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/blog/page.html',
  'models/blog/posts'
], function($, _, Backbone, optimizePageTemplate, blogModel){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    initialize: function(){
      this.model = new blogModel;
      this.model.on('updated',function(){this.renderBlogEntry();},this);
      this.model.on('noPrevPosts',function(){this.disablePrev();},this);
      this.model.on('noNextPosts',function(){this.disableNext();},this);
      this.model.on('prevPosts',function(){this.enablePrev();},this);
      this.model.on('nextPosts',function(){this.enableNext();},this);
      this.disableNext();
    },
    model : {},
    events : {
      "click #next" : "getNextPost",
      "click #prev" : "getPrevPost"
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
      this.renderBlogEntry();
    },
    renderBlogEntry: function(){
      $.each(this.model.attributes,function(key,val){
        switch(typeof val){
          case 'object':
            break;
          default:
            $('.value#'+key).html(val);
            break;
        }
     });
     this.model.probeNextPost();
     this.model.probePrevPost();
    }
  });
  return OptimizePage;
});

