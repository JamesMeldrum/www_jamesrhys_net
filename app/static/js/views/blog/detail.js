define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/blog/page.html',
  'templates/blog/list_item',
  'text!templates/blog/detail.html',
  'models/blog/posts'
], function($, _, Backbone, indexPageTemplate, listItemTemplate, detailPageTemplate, blogsModel){
  var TalksIndex = Backbone.View.extend({
    el: '.page',
    events: {
      "click a.detailLink" : "renderDetail",
      "click .talksNav#back" : "closeDetail"
    },
    initialize: function(req_title){
      this.model = new blogsModel,
      this.model.request_paras = {
        't':'title',
        'b':req_title
      };
      this.model.on('load_complete', function(){this.renderDetail();},this); 
      this.model.getDetail();
    },
    req_id: 0,
    req_title: '',
    model : {},
    render: function(id){
      this.$el.html(detailPageTemplate);
    },
    renderDetail: function(){
      that = this;
      console.log("RENDER DEET");
     var talkCachedData = this.model.attributes.all[this.req_id];
     var talkCachedRef = $('.blogDetail').children('.blogPost');

      console.log(this.model.attributes.all);

      $('#title').html(talkCachedData.title);
      $('#subtitle').html(talkCachedData.subtitle);
      $('#body').html(talkCachedData.body);
      $('#tags').html(talkCachedData.tags.toString());
      $('#date').html(talkCachedData.date);

      $('.blogCont').animate({
        'margin-left':'-980px',
      },500,function(){});
      $('.blogDetail').animate({
        'margin-left':'0px',
        'opacity':'toggle'
        },1000,function(){
        console.log("Animateion complete");
      });

    },
    closeDetail: function(e){
      $('.blogCont').animate({
        'margin-left':'0px',
        'opacity': 'toggle'
      },1000,function(){});
      $('.blogDetail').animate({
        'margin-left':'980px',
        'opacity': 'toggle'
        },1000,function(){
      window.location.href='http://127.0.0.1:8000/#!/blog';
      });
    }
  });
  return TalksIndex;
});

