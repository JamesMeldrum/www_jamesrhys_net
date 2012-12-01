define([
  'jquery',
  'lodash',
  'backbone',
  'impress',
  'text!templates/index/page.html'
], function($, _, Backbone, Impress, indexPageTemplate, Impress){
  var IndexPage = Backbone.View.extend({
    el: '.page',
    render: function () {
      $(this.el).html(indexPageTemplate);
      this.renderImpress();
    },
    renderImpress : function(){
      var api = impress()
      api.init();
      var navigateHome = function(){
        $('#impress').fadeOut('slow',function(){
          window.location = '#core';
          $('.impressCont').html('');
        });
      };
      var trackFinal = function(){
        var isFinal = $('#overview').hasClass('active'); 
        if(isFinal){
          navigateHome();
        }
      } 
      window.setInterval(trackFinal,500); // TODO: Remove this from dom
    }
  });
  return IndexPage;
});

