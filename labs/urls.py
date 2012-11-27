from django.conf.urls import patterns, include, url
from app.view_templates.JRMBase import JRMListView
from django.views.generic import DetailView
from labs.models import Experiment 

urlpatterns = patterns('',
    url(r'^$',
        JRMListView.as_view(
            queryset=Experiment.objects.order_by('-published')[:5],
            template_name='labs/frontend/index.html')
    ),
    url(r'^(?P<pk>\d+)/$',
        DetailView.as_view(
            model = Experiment,
            template_name = 'labs/frontend/detail.html')
    )
)

