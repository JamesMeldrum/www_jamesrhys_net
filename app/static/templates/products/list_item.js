define([
  'underscore'
], function(_){
  var list_item = _.template('<a href="<%= href %>"><div class="labsEntry" id="<%= id %>"><div class="labsPreview"><%= thumbnail %></div><div class="subheading labsTitle"><%= title %></div></div></a>');
  return list_item;  
})
