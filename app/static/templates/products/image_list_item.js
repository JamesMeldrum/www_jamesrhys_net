define([
  'underscore'
], function(_){
  var list_item = _.template('<li><img src="http://127.0.0.1/files/www_jamesrhys_net/<%= url %>"/></li>');
  return list_item;  
})
