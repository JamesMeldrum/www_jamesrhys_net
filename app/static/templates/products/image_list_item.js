define([
  'underscore'
], function(_){
  var list_item = _.template('<li><img src="/files/www_jamesrhys_net/<%= url %>"/></li>');
  return list_item;  
})
