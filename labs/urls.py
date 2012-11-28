from django.conf.urls import patterns, include, url
from app.view_templates.JRMBase import JRMListView
from django.views.generic import DetailView
from labs.models import Experiment 
from labs.view_templates.Labs import LabDetailView

urlpatterns = patterns('',
    url(r'^$',
        JRMListView.as_view(
            queryset=Experiment.objects.order_by('-published')[:5],
            context_object_name = 'experiments_list',
            template_name='labs/frontend/index.html')
    ),
    url(r'^(\d)/$',
        LabDetailView.as_view()
    )
)

