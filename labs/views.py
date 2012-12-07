from django.template import Context,loader, RequestContext
from django.shortcuts import render_to_response, get_object_or_404
from django.core.urlresolvers import reverse
from django.http import Http404
from api.models import Experiment 
from app.models import SiteMetaData
from django.http import HttpResponse, HttpResponseRedirect

def list_experiments(request,experiment_id):
  print "In list_exp"
  experiment = get_object_or_404(Experiment, pk=experiment_id)
  t = loader.get_template('labs/frontend/'+str(experiment_id)+'/index.html')
  c = Context({
      'experiment' : experiment,
      'host' : request.get_host()
  })

  c['meta_data'] = SiteMetaData.objects.all()

  return HttpResponse(t.render(c))
