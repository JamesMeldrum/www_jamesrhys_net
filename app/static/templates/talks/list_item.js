define([
  'underscore'
], function(_){
  var list_item = _.template("<li id='<%= id %>'><p><a id='<%= id %>' class='detailLink' href='#!/talks/<% print(title.replace(' ','-')) %>'>⇀&nbsp;&nbsp;&nbsp;<%= title %>&nbsp;:&nbsp;<%= date %></a></p></li>");
  return list_item;  
})
