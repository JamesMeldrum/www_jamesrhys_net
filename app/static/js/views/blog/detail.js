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
      var talkCachedData = this.model.attributes.all[this.req_id];
      var talkCachedRef = $('.blogDetail').children('.blogPost');

      $('#title').html(talkCachedData.title);
      $('#subtitle').html(talkCachedData.subtitle);
			var re_newline = /\r\n/g;
			talkCachedData.body = talkCachedData.body.replace(re_newline,'</br>');
      $('#body').html(talkCachedData.body.toString());
      $('#tags').html(talkCachedData.tags.toString());
      $('#date').html(talkCachedData.date);
      $('meta[name=og\\:title]').attr('content',talkCachedData.title);
      document.title = talkCachedData.title;

      $('.blogCont').animate({
        'margin-left':'-980px',
      },500,function(){
	});
      $('.blogDetail').animate({
        'margin-left':'0px',
        'opacity':'toggle'
        },1000,function(){
			hljs.initHighlighting();
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
      window.location.href='/#!/blog';
      });
    }
  });
  return TalksIndex;
});

