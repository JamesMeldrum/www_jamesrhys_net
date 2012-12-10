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
      "click .talksNav#back" : "closeDetail"
    },
    initialize: function(req_title){
      this.model = new talksModel,
      this.model.on('load_complete', function(){this.renderDetail();},this); 
      this.model.request_paras['t'] = 'title';
      this.model.request_paras['b'] = req_title;
      this.model.getDetail();
    },
    req_id: 0,
    req_title: '',
    model : {},
    render: function(id){
      this.$el.html(detailPageTemplate);
    },
    renderDetail: function(){
     var talkCachedData = this.model.attributes.all[this.req_id];
     var talkCachedRef = $('.talksDetail').children('.talksPost');

      $('#title').html(talkCachedData.title);
      $('#subtitle').html(talkCachedData.slide_deck_url);
      $('#body').html(talkCachedData.description);
      $('#tags').html(talkCachedData.tags.toString());
      $('#date').html(talkCachedData.date);

      $('.talksCont').animate({
        'margin-left':'-980px',
        'opacity': 'toggle'
      },1000,function(){});
      $('.talksDetail').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
        },1000,function(){
        
      });

    },
    closeDetail: function(e){
      e.preventDefault();
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

