define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/blog/page.html',
  'models/blog/posts'
], function($, _, Backbone, optimizePageTemplate, blogModel){
  var OptimizePage = Backbone.View.extend({
    el: '.page',
    that: this,
    render: function () {
      this.$el.html(optimizePageTemplate);
      this.renderBlogEntry();
    },
    renderBlogEntry: function(){
      var blogEntry = new blogModel;
      $.each(blogEntry.toJSON(),function(key,val){
        switch (typeof val) {
          case "object":
              if(typeof val.length != 'undefined'){
                val.sort();
                $.each(val,function(ndx,tags){
                  if(ndx == val.length-1){
                    $(".value#tags").append(tags);  
                  }else{
                    $(".value#tags").append(tags+", ");  
                  }
                });
              }else{
                console.log("date"); 
                $(".value#date").html(val.getDate() + "/" + val.getMonth() +"/"+val.getFullYear());
              }
            break;
          default:
            $('.value#'+key).html(val);
            $('.key#'+key).html(key.toString());
            break;
        }
      });
    }
  });
  return OptimizePage;
});
