define([
  'underscore'
], function(_){
  var list_item = _.template('<a href="/labs/<%= id %>"><div class="labsEntry" id="<%= id %>"><div class="labsPreview"><img src="/files/www_jamesrhys_net/<%= thumbnail %>"/></div><div class="subheading labsTitle"><%= title %></div></div></a>');
  return list_item;  
})




    
