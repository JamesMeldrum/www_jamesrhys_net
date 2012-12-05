// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
], function ($, _, Backbone, Vm) {

  Backbone.emulateHTTP = true;
  Backbone.emulateJSON = true;

  var AppRouter = Backbone.Router.extend({
    routes: {
      '!/core' : 'core',
      '!/blog' : 'blog',
      '!/blog/:title' : 'blogPost',
      '!/labs' : 'labs',
      '!/talks' : 'talks',
      '!/prod' : 'products'
    }
  });

  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter(options);
    router.on('route:index', function (actions) {
      require(['views/index/page'], function (IndexPage) {
        var indexPage = Vm.create(appView, 'IndexPage', IndexPage);
        indexPage.render();
      });
    });
    router.on('route:talks', function (actions) {
//      require(['views/talks/page'], function (IndexPage) {
//        var indexPage = Vm.create(appView, 'IndexPage', IndexPage);
//        indexPage.render();
      console.log("Talks requested.");
//     });
    });
    router.on('route:core', function (actions) {
      require(['views/core/page'], function (CorePage) {
        var corePage = Vm.create(appView, 'CorePage', CorePage);
        corePage.render();
      });
    });
    router.on('route:blog', function (actions) {
      require(['views/blog/page'], function (BlogPage) {
        var blogPage = Vm.create(appView, 'BlogPage', BlogPage);
        blogPage.render();
      });
    });
    router.on('route:blogPost', function (actions, blog_title) {
      require(['views/blog/post'], function (BlogPage) {
        var blogPage = Vm.create(appView, 'BlogPage', BlogPage);
        blogPage.render();
      });
    });
    router.on('route:labs', function () {
     require(['views/labs/page'], function (ModulePage) {
        var modulePage = Vm.create(appView, 'ModulesPage', ModulePage);
        modulePage.render();
      });
    });
    router.on('route:products', function (section) {
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
