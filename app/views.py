"""
    Author: James Meldrum
    Date: 11/27/2012
    Desc: Default View request handler
"""

from django.template import Context,loader, RequestContext
from django.shortcuts import render_to_response, get_object_or_404
from django.core.urlresolvers import reverse
from django.http import Http404
from app.models import SiteMetaData 
from django.http import HttpResponse, HttpResponseRedirect

def index(request):

  template = loader.get_template('site_base.html')
  context = Context()
          
  context['meta_data'] = SiteMetaData.objects.all()
  context['site_title'] = "Cold Crescent Interactive"

  return HttpResponse(template.render(context))

def detail(request,poll_id):
    try:
        p = Poll.objects.get(pk=poll_id)
    except Poll.DoesNotExist:
        raise Http404
    return render_to_response('frontend/detail.html',{'poll':p},
                              context_instance=RequestContext(request))

def results(request,poll_id):
    p = get_object_or_404(Poll, pk=poll_id)
    return render_to_response('frontend/results.html',{'poll':p})

def vote(request,poll_id):
    p = get_object_or_404(Poll, pk=poll_id)
    try:
        selected_choice = p.choice_set.get(pk=request.POST['choice'])
    except(KeyError, Choice.DoesNotExist):
        return render_to_response('frontend/detail.html',{
            'poll':p,
            'error_message':'You didn\'t select a choice.',
        },context_instance=RequestContext(request))
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('poll_results',args=(p.id,)))

