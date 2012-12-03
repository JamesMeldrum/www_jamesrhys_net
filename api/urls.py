from django.conf.urls import patterns, include, url
from labs.models import Experiment 
from labs.view_templates.Labs import LabDetailView

urlpatterns = patterns('',
    url(r'^(?P<object_name>\w+)/(?P<request_operation>\w+)/\w*$','api.views.index')
)


