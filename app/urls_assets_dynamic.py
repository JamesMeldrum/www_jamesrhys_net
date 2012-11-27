"""
    Author: James Meldrum
    Date: 11/27/2012
    Desc: Handles all dynamic asset requests
"""

from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$','app.views.assets_dynamic')
)

