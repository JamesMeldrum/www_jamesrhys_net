"""
    Author: JRM
    Date: 11/27/2012
    Desc: Base request handler for the domain 
"""

from django.conf.urls import patterns, include, url
from django.conf import settings
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

## Assign site-level meta queries - should be queued to avoid locking

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include ('api.urls')),
    url(r'^labs/', include('labs.urls')), 
    url(r'^$', 'app.views.index')
)

if settings.DEBUG:
  urlpatterns += patterns('django.views.static',
    (r'media/(?P<path>.*)','serve', {'document_root':settings.MEDIA_ROOT}),
  )
