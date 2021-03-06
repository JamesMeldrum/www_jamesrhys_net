from django.conf.urls import patterns, include, url
from django.views.generic import DetailView, ListView
from app.models import Poll

urlpatterns = patterns('',
    url(r'^$',
        ListView.as_view(
            queryset=Poll.objects.order_by('-pub_date')[:5],
            context_object_name='latest_poll_list',
            template_name='frontend/index.html')
    ),
    url(r'^(?P<pk>\d+)/$',
        DetailView.as_view(
            model = Poll,
            template_name = 'frontend/detail.html')
    ),
    url(r'^(?P<pk>\d+)/results/$',
        DetailView.as_view(
            model = Poll,
            template_name = 'frontend/results.html'),
        name = 'poll_results'
    ),
    url(r'^(?P<poll_id>\d+)/vote/$','app.views.vote')
)
