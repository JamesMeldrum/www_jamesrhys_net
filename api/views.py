from django.core import serializers
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404
from api.models import Tag, BlogPost, Experiment, Product, Talks
from datetime import datetime
import re

def index(request, object_name, request_operation):
  request_type = request.GET.get('t')
  arh = APIRequestHandler(request, object_name, request_operation)
  respData = arh.getResp()
  if respData == None:
    raise Http404
  elif request.GET.get('t') == 'all' and object_name == 'blog':
    data = serializers.serialize("json", arh.getResp(), excludes=('body',),ensure_ascii = False,relations=('tags'))
    return HttpResponse(data,mimetype='application/json') 
  elif request.GET.get('t') == 'title' and object_name == 'blog':
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False,fields=('title','subtitle','tags','date_published','body'),relations=('tags'))
    return HttpResponse(data,mimetype='application/json') 
  elif request.GET.get('t') == 'all' and object_name == 'prod':
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False,relations=('tags'),excludes=('body','goals','technologies','date_description'))
    return HttpResponse(data,mimetype='application/json') 
  elif request.GET.get('t') == 'title' and object_name == 'prod':
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False,relations=('tags','images'))
    data2 = serializers.serialize("json", arh.getResp()[0].images.all(), ensure_ascii = False,relations=('tags','images'))
    data = data[:-3]+", \"images\":"+data2+data[-3:]
    return HttpResponse(data,mimetype='application/json') 
  elif request.GET.get('t') == 'all' and object_name == 'talks':
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False,relations=('tags'),excludes=('body','slide_deck_url','description'))
    return HttpResponse(data,mimetype='application/json') 
  elif request.GET.get('t') == 'title' and object_name == 'talks':
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False,relations=('tags'))
    return HttpResponse(data,mimetype='application/json') 
  else:
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False)
    return HttpResponse(data,mimetype='application/json') 

class APIRequestHandler(object):

  """
      Singleton request handler. Inits with request data. Parses request data. Returns a django object to serialize. Depends heavily on introspection.

      Example queries:

        * Get next blog post http://127.0.0.1:8000/api/blog/get/q?t=date&p=prev&b=03012012
        * Get 6 most recent labs
    
  """

  def __init__(self, request, object_name, request_operation):
    self.response_object = None
    self.exec_ns = {}
    self.request_object = {
      'request': request,
      'object_name': object_name,
      'request_operation':request_operation,
      'get_params' : request.GET,
      'get_type' : request.GET.get('t',None),
      'get_base' : request.GET.get('b','1'),
      'get_param' : request.GET.get('p',None),
      'get_param_type' : request.GET.get('p',None),
      'get_quantity' : request.GET.get('qn','1')
    } 

    if self.request_object['get_type'] != 'date':
      self.request_object['get_param_type' ] =  self.parse_param_type(self.request_object['get_param'])
    else:
      self.parse_param_type(self.request_object['get_base'])

    # Aliasing of imported types. Done for obfuscation of requests

    self.object_types = ['blog','lab','prod','tag'] 
    self.object_types_callable = {
                                  'blog':'BlogPost',
                                  'lab':'Experiment',
                                  'prod':'Product',
                                  'tag':'Tag',
                                  'talks':'Talks'
    }
    self.object_types_sort = {
                                  'blog':'date_published',    # As this comes along, 
                                  'lab':'date_published',     # allow users to change
                                  'prod':'date_published',    # default sort order
                                  'tag':'pk',
                                  'talks':'pk'
    }

# ./api/talks/get/q?t=all

    # Operations supported by the object_types

    self.object_operations = {
                               'tag' : ['id','title','all'],
                               'blog' : ['id', 'title', 'tag', 'date', 'all'], 
                               'lab' : ['id', 'title', 'tag', 'date', 'all'],  
                               'prod' : ['id', 'title', 'tag', 'date', 'all'],
                               'talks' : ['id', 'title', 'tag', 'date', 'all']
    }

    # Paramters supported by operations

    self.object_params = {
                              'id': ['prev','next','int'],
                              'title': ['string'],
                              'tag': ['int','string'],
                              'date': ['prev','next','date']
    }
                            
#    self.validateRequest()
    self.parseRequest()

  ## Minute attempt at preventing SQL injection through method side-effects and slugification

  def parse_param_type(self, get_param):
    if get_param == None:
      return None
    get_param = str(get_param)
    if get_param == 'next' or get_param == 'prev' or get_param == 'all':
      return get_param
    elif re.search('\d{8}',get_param):
      ## Input -  DD MM YYYY
      ## Format - YYYY - MM -DD
      self.request_object['get_base'] = datetime(int(re.search('\d{8}',get_param).group(0)[4:8]),int(re.search('\d{8}',get_param).group(0)[0:2]),int(re.search('\d{8}',get_param).group(0)[2:4]))
      return 'date'
    elif re.search('\d',get_param):
      self.request_object['get_param'] = re.search('\d+',get_param).group(0)
      return 'int'
    elif re.search('(\w|\-)+',get_param):
      self.request_object['get_param'] = re.search('(\w|\-)+',get_param).group(0).replace('-',' ')
      return 'string'
    else:
      return None

  def validateRequest(self):
    assumptions = [
                    [self.request_object['request'], "invalid request"], 
                    [self.request_object['object_name'], "invalid object name"], 
                    [self.request_object['request_operation'], "invalid request operation"],
#                    [(self.request_object['request_operation'] in self.object_operations[self.request_object['object_name']]),"Invalid request operation 2"],
                    [self.request_object['object_name'] in self.object_types, "invalid object name 2"],
                    [self.request_object['get_type'] in self.object_operations[self.request_object['object_name']]], # get_type is supported by an object_name
#                    [self.request_object['get_param_type'] in self.object_params[self.request_object['get_type']]], # get_parameter is supported by get_type
                    
    ]

    for assumption in assumptions:
      assert assumption != False

  def parseRequest(self):

    exec_string = ''
    if self.request_object['object_name'] == 'talks':
      if self.request_object['get_type'] == 'all':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').all()'
      elif self.request_object['get_type'] == 'title':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').filter(title__exact=\''+self.request_object['get_base'].replace('-',' ')+'\').all()'
      elif self.request_object['get_type'] == 'id':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').filter(id__exact='+self.request_object['get_base']+').all()'
      else:
        pass
    elif self.request_object['object_name'] == 'prod':
      if self.request_object['get_type'] == 'title':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.select_related().filter(title__exact=\''+self.request_object['get_base'].replace('-',' ')+'\').all()'
      elif self.request_object['get_type'] == 'all':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').all()'
      else:
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').filter(id__gte='+self.request_object['get_base']+').all()'
    elif self.request_object['object_name'] == 'lab':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').filter(id__gte='+self.request_object['get_base']+').all()'
    elif self.request_object['object_name'] == 'prod':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').filter(id__gte='+self.request_object['get_base']+').all()'
    elif self.request_object['object_name'] == 'blog':
      if self.request_object['get_type'] == 'all':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'-id\').all()'
      elif self.request_object['get_type'] == 'next':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.filter(id__gt=\''+self.request_object['get_base']+'\').order_by(\'id\').all()[:1]'
      elif self.request_object['get_type'] == 'prev':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.filter(id__lt=\''+self.request_object['get_base']+'\').order_by(\'-id\').all()[:1]'
      elif self.request_object['get_type'] == 'title':
        exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.filter(title__exact=\''+self.request_object['get_base'].replace('-',' ')+'\').all()'
    else:
       raise Exception("Bee bop a loo laa")

    code = compile(exec_string,'<string>','exec')
    exec code 

  def getResp(self):
    return self.response_object
