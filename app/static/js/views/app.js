define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.pageParent',
    initialize: function () {
    },
    render: function () {
      var that = this;
      $(this.el).html(layoutTemplate);
    },
    bindPageEvents: function(){

      var section_re = /(core|labs|blog|prod|talks)/im;
	if(section_re.exec(window.location.href) != null ){
      		var active_page = section_re.exec(window.location.href)[0]; 

	if( typeof active_page != 'undefined'){
      		$('ul#nav li a.textTransform').removeClass('active');
      		$('#'+active_page).addClass('active');
	}
}

      $('ul#nav li a.textTransform').bind('click',function(e){
      	var active_page = e.currentTarget.id; // handle undef results - there won't be any buttttttt
        $('ul#nav li a.textTransform').removeClass('active');
        $('#'+active_page).addClass('active');
      });

    }
  });
  return AppView;
});

// Events object. Bind anchor click events here
