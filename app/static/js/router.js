// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '!/core' : 'core',
      '!/blog' : 'blog',
      '!/blog/:title' : 'blogPost',
      '!/labs' : 'labs',
      '!/prod' : 'products',
      '': 'index'
    }
  });

  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter(options);
    router.on('route:index', function (actions) {
      require(['views/index/page'], function (IndexPage) {
        console.log("Route index");
        var indexPage = Vm.create(appView, 'IndexPage', IndexPage);
        indexPage.render();
      });
    });
    router.on('route:core', function (actions) {
      require(['views/core/page'], function (CorePage) {
        console.log("Route core");
        var corePage = Vm.create(appView, 'CorePage', CorePage);
        corePage.render();
      });
    });
    router.on('route:blog', function (actions) {
      require(['views/blog/page'], function (BlogPage) {
        console.log("Route blog");
        var blogPage = Vm.create(appView, 'BlogPage', BlogPage);
        blogPage.render();
      });
    });
    router.on('route:blogPost', function (actions, blog_title) {
      require(['views/blog/post'], function (BlogPage) {
        console.log("Route blog post");
        var blogPage = Vm.create(appView, 'BlogPage', BlogPage);
        blogPage.render();
      });
    });
    router.on('route:labs', function () {
      console.log("route labs");
     require(['views/labs/page'], function (ModulePage) {
        var modulePage = Vm.create(appView, 'ModulesPage', ModulePage);
        modulePage.render();
      });
    });
    router.on('route:products', function (section) {
      console.log("route products");
      require(['views/products/page'], function (BackbonePage) {
        var backbonePage = Vm.create(appView, 'BackbonePage', BackbonePage, {section: section});
        backbonePage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
