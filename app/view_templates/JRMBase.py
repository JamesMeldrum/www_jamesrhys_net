"""
    Author: JRM
    Date: 11/27/2012
    Desc: Base view template for all pages. Really just sets up meta-data at the moment 

          Looks as thought I'm forced to subclass each of the basic templates as they each implement the get_context_data method separately through mix-ins...blargh
          
    TODO: Sooooooooooooo ugly. Refactor.

"""

from django.views.generic import DetailView, ListView
from app.models import SiteMetaData

class JRMListView(ListView):
    
    def get_context_data(self,**kwargs):
        # Call the base implementation first to get a context
        context = super(JRMListView,self).get_context_data(**kwargs)
        # Add in a query set of all the books
        context['meta_data'] = SiteMetaData.objects.all()
        context['site_title'] = "James' Site Title"

        # Space here to configure globals

        return context 

class JRMDetailView(DetailView):
    
    def get_context_data(self,**kwargs):
        context = super(JRMDetailView,self).get_context_data(**kwargs)
        context['meta_data'] = SiteMetaData.objects.all()
        context['site_title'] = "James' Site Title"

        return context 
