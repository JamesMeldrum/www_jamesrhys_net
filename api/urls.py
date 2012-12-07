from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^(?P<object_name>\w+)/(?P<request_operation>\w+)/\w*$','api.views.index')
)


