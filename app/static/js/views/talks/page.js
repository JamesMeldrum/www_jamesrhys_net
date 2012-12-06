define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/talks/page.html',
  'templates/talks/list_item',
  'text!templates/talks/detail.html',
  'models/talks/index'
], function($, _, Backbone, indexPageTemplate, listItemTemplate, detailPageTemplate, talksModel){
  var TalksIndex = Backbone.View.extend({
    el: '.page',
    events: {
      "click a.detailLink" : "renderDetail",
      "click .talksNav#back" : "closeDetail"
    },
    initialize: function(){
      this.model.on('load_complete', function(){this.renderList();},this); 
      this.model.getAll();
    },
    model : new talksModel,
    render: function(){
      this.$el.html(indexPageTemplate);
    },
    renderList : function(){
      $.each(this.model.attributes.all,function(ndx, talkObject){
      console.log(talkObject);
      if($('.talksList').children('#'+ndx).length == 0){
        $(".talksList").append(listItemTemplate({title:talkObject.title, id:ndx}));
        console.log("Index: "+ndx);
      }
      });
    },
    renderDetail: function(e){
      console.log(this.model.attributes.all[e.target.id]);
      var talkCachedData = this.model.attributes.all[e.target.id];
      var talkCachedRef = $('.talksDetail').children('.talksPost');

      talkCachedRef.children('#title').html(talkCachedData.title);
      talkCachedRef.children('#subtitle').html(talkCachedData.slide_deck_url);
      talkCachedRef.children('#body').html(talkCachedData.description);

      $('.talksCont').animate({
        'margin-left':'-980px',
        'opacity': 'toggle'
      },1000,function(){});
      $('.talksDetail').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
        },1000,function(){
        console.log("Animateion complete");
      });

    },
    closeDetail: function(e){
      $('.talksCont').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
      },1000,function(){});
      $('.talksDetail').animate({
        'margin-left':'980px',
        'opacity': 'toggle'
        },1000,function(){
          var talkCachedRef = $('.talksDetail').children('.talksPost');
          talkCachedRef.children('#title').html('');
          talkCachedRef.children('#subtitle').html('');
          talkCachedRef.children('#body').html('');
      });
    }
  });
  return TalksIndex;
});
