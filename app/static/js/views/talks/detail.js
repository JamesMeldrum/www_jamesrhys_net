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
    initialize: function(req_title){
      this.model = new talksModel,
      this.model.on('load_complete', function(){this.renderDetail();},this); 
      this.req_title = req_title;
      this.model.getAll();
    },
    req_id: 0,
    req_title: '',
    model : {},
    render: function(id){
      this.$el.html(detailPageTemplate);
    },
    renderDetail: function(){
      that = this;
      $.each(this.model.attributes.all,function(ndx,el){
        console.log(el.title);
        console.log(that.req_title);
        if(el.title.replace(" ","-") == that.req_title){
          console.log("Confirm");
          that.req_id = ndx;
        }
      });
     var talkCachedData = this.model.attributes.all[this.req_id];
     var talkCachedRef = $('.talksDetail').children('.talksPost');

      console.log(this.model.attributes.all);

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
      window.location.href='http://127.0.0.1:8000/#!/talks';
      });
    }
  });
  return TalksIndex;
});

