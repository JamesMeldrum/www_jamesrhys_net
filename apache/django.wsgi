"""
WSGI config for www_jamesrhys_net project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os
import sys

root = os.path.join(os.path.dirname(__file__),'..')
sys.path.insert(0,root)
activate_this = os.path.join(root,'/home/j/.virtualenvs/www_jamesrhys_net/bin/activate_this.py')
execfile(activate_this,dict(__file__=activate_this))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "www_jamesrhys_net.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Apply WSGI middleware here.
# from helloworld.wsgi import HelloWorldApplication
# application = HelloWorldApplication(application)
