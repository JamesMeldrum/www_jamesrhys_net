define([
  'underscore'
], function(_){
  var list_item = _.template("<li id='<%= id %>'><a id='<%= id %>' class='detailLink' href='#!/talks/<% print(title.replace(' ','-')) %>'><%= title %></a></li>");
  return list_item;  
})
