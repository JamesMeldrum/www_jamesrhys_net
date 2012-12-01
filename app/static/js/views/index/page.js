define([
  'jquery',
  'lodash',
  'backbone',
  'impress',
  'text!templates/index/page.html'
], function($, _, Backbone, Impress, indexPageTemplate, Impress){
  var IndexPage = Backbone.View.extend({
    el: '.container',
    render: function () {
      $('.pageParent').css('display','none');
      $(this.el).html(indexPageTemplate);
      this.renderImpress();
    },
    renderImpress : function(){
      var api = impress()
      api.init();
      var navigateHome = function(){
        $('#impress').fadeOut('slow',function(){
          window.location = '/#!/core';
          $('.impressCont').remove();
          $('body').attr('style','');
          $('body').removeClass('impress-supported').removeClass('impress-enabled').removeClass('impress-one');
          $('.pageParent').fadeIn('slow');
        });
      };
      var trackFinal = function(){
        var isFinal = $('#overview').hasClass('active'); 
        if(isFinal){
          navigateHome();
          window.clearInterval(window.trackFinalTimer);
        }
      } 
      window.trackFinalTimer = window.setInterval(trackFinal,500); 
    }
  });
  return IndexPage;
});

