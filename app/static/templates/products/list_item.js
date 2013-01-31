define([
  'underscore'
], function(_){
  var list_item = _.template('<a class="detailLink" href="<%= href %>"><div class="labsEntry" id="<%= id %>"><div class="labsPreview"><center><img src="/media/<%= thumbnail %>"/></center></div><div class="subheading labsTitle"><%= title %></div></div></a>');
  return list_item;  
})
