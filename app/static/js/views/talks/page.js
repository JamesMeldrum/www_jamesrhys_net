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
      "click a.detailLink" : "renderDetail"
    },
    initialize: function(){
      this.model.on('load_complete', function(){this.renderList();},this); 
      this.model.request_paras['t'] = 'all';
      this.model.request_paras['b'] = '';
      this.model.getAll();
    },
    model : new talksModel,
    render: function(){
      $('meta[name=og\\:title]').attr('content','ColdCrescentInteractive - Talks');
      document.title = "ColdCrescentInteractive - Talks"
      this.$el.html(indexPageTemplate);
    },
    renderList : function(){
      $.each(this.model.attributes.all,function(ndx, talkObject){
      if($('.talksList').children('#'+ndx).length == 0){
        $(".talksList").append(listItemTemplate({title:talkObject.title, id:ndx, date:talkObject.date_published}));
      }
      });
    },
    renderDetail: function(e){
      e.preventDefault();
      $('.talksCont').animate({
        'margin-left':'-980px',
        'opacity': 'toggle'
      },1000,function(){
        window.location.href=e.currentTarget.href;
      });

    }
  });
  return TalksIndex;
});
