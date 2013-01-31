define([
  'underscore'
], function(_){
  var list_item = _.template('<li><img src="/media/<%= url %>"/></li>');
  return list_item;  
})
