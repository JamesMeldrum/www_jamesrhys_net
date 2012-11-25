# Create your views here.

from django.template import Context,loader
from django.shortcuts import render_to_response
from django.http import Http404
from app.models import Poll
from django.http import HttpResponse

def index(request):

    latest_poll_list = Poll.objects.all().order_by('-pub_date')[:5]
    #t = loader.get_template('frontend/index.html')
    #c = Context({
    #    'latest_poll_list':latest_poll_list,
    #})

    #output = ', '.join([p.question for p in latest_poll_list])

    #return HttpResponse(t.render(c))
    return render_to_response('frontend/index.html', {'latest_poll_list':latest_poll_list})

def detail(request,poll_id):
    try:
        p = Poll.objects.get(pk=poll_id)
    except Poll.DoesNotExist:
        raise Http404
    return render_to_response('frontend/detail.html',{'poll':p})

def results(request,poll_id):
    return HttpResponse("You're looking at the results of poll %s." % poll_id)

def vote(request,poll_id):
    return HttpResponse("You're voting on poll %s." % poll_id)
