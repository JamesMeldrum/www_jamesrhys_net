"""
    Author: JRM
    Date: 11/27/2012
    Desc: Base request handler for the domain 
"""

from django.conf.urls import patterns, include, url
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

## Assign site-level meta queries - should be queued to avoid locking

urlpatterns = patterns('',
    # Used staticfiles module instead
    #url(r'.*{css|js}^', include ('app.urls_assets_dynamic')),
    #url(r'.*{png|jpg|jpeg|gif|pdf|csv}^', include ('app.urls_assets_static')),
    url(r'^polls/', include('app.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^labs/', include('labs.urls')), 
    url(r'^.*$', 'app.views.index')
    #url(r'^blog/', include('blog.urls')),
)
