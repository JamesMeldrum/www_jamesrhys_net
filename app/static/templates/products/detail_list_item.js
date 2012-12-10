define([
  'underscore'
], function(_){
  var list_item = _.template('<li class="p">⇀&nbsp;&nbsp;<%= list_val %></li>');
  return list_item;  
})
