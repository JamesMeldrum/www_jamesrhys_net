from django.conf.urls import patterns, include, url
from app.view_templates.JRMBase import JRMListView
from django.views.generic import DetailView
from api.models import Experiment 
from labs.view_templates.Labs import LabDetailView

urlpatterns = patterns('',
    url(r'^(?P<experiment_id>\d+)$','labs.views.list_experiment'
    )
)

