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
      '!/labs' : 'labs',
      '!/blog' : 'blog',
      '!/blog/:slug_title' : 'blogDetail',
      '!/talks' : 'talks',
      '!/talks/:slug_title' : 'talksDetail',
      '!/prod' : 'products',
      '!/prod/:slug_title' : 'productsDetail'
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
      require(['views/talks/page'], function (IndexPage) {
        var indexPage = Vm.create(appView, 'IndexPage', IndexPage);
        indexPage.render();
     });
    });
    router.on('route:talksDetail', function (slug_title) {
      require(['views/talks/detail'], function (IndexPage) {
        var indexPage = Vm.create(appView, 'IndexPage', IndexPage,slug_title);
        indexPage.render();
     });
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
    router.on('route:blogDetail', function (slug_title) {
      require(['views/blog/detail'], function (BlogPage) {
        var blogPage = Vm.create(appView, 'BlogPage', BlogPage,slug_title);
        blogPage.render();
      });
    });
    router.on('route:labs', function () {
     require(['views/labs/page'], function (ModulePage) {
        var modulePage = Vm.create(appView, 'ModulesPage', ModulePage);
        modulePage.render();
      });
    });
    router.on('route:products', function () {
      require(['views/products/page'], function (ProductsPage) {
        var productsPage = Vm.create(appView, 'BackbonePage', ProductsPage);
        productsPage.render();
      });
    });
    router.on('route:productsDetail', function (slug_title) {
      require(['views/products/detail'], function (ProductsPage) {
        var productsPage = Vm.create(appView, 'BackbonePage', ProductsPage,slug_title);
        productsPage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
