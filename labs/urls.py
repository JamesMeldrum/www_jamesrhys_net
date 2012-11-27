from django.conf.urls import patterns, include, url
from django.views.generic import DetailView, ListView
from labs.models import Experiment 

urlpatterns = patterns('',
    url(r'^$',
        ListView.as_view(
            queryset=Experiment.objects.order_by('-published')[:5],
            template_name='labs/frontend/index.html')
    ),
    url(r'^(?P<pk>\d+)/$',
        DetailView.as_view(
            model = Experiment,
            template_name = 'labs/frontend/detail.html')
    )
)

