from django.core import serializers
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404
from api.models import Tag, BlogPost, Experiment, Product
import re

def index(request, object_name, request_operation):
  arh = APIRequestHandler(request, object_name, request_operation)
  resp = HttpResponse()
  respData = arh.getResp()
  if respData == None:
    raise Http404
  else:
    data = serializers.serialize("json", arh.getResp(), ensure_ascii = False, stream=resp)
  # Set headers like this
    resp['JRM_API'] = 'Property of Cold Crescent Interactive - the portfolio of James Rhys'
    return resp

class APIRequestHandler(object):

  """
      Singleton request handler. Inits with request data. Parses request data. Returns a django object to serialize. Depends heavily on introspection.
  """

  def __init__(self, request, object_name, request_operation):
    self.response_object = Tag.objects.all()
    self.exec_ns = {}
    self.request_object = {
      'request': request,
      'object_name': object_name,
      'request_operation':request_operation,
      'get_params' : request.GET,
      'get_type' : request.GET['t'] or None,
      'get_param' : request.GET['p'] or None,
      'get_param_type' : self.parse_param_type(request.GET['p']),
      'get_quantity' : request.GET['qn'] or None
    } 

    # Aliasing of imported types. Done for obfuscation of requests

    self.object_types = ['blog','lab','prod','tag'] 
    self.object_types_callable = {
                                  'blog':'BlogPost',
                                  'lab':'Experiment',
                                  'prod':'Product',
                                  'tag':'Tag',
    }

    # Operations supported by the object_types

    self.object_operations = {
                               'tag' : ['id','title','all'],
                               'blog' : ['id, title, tag, date, all'], 
                               'lab' : ['id, title, tag, date, all'],  
                               'prod' : ['id, title, tag, date, all']
    }

    # Paramters supported by operations

    self.object_params = {
                              'id': ['prev','next','int'],
                              'title': ['prev','next','string'],
                              'tag': ['int','string'],
                              'date': ['prev','next','date'],
    }
                            
    self.validateRequest()
    self.parseRequest()

  def parse_param_type(get_param):

    get_param = str(get_param)
    if get_param == 'next' || get_param == 'prev' || get_param == 'all':
      return get_param
    elif re.search('\d{8}',get_param).group(0) == len(get_param):
      return 'date'
    elif re.search('\d+',get_param):
      return 'int'
    elif re.search('(\w|\-)+',get_param):
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
                    [self.request_object['get_param_type'] in self.object_params[self.request_object['get_type']]], # get_parameter is supported by get_type
                    
    ]

    for assumption in assumptions:
      assert assumption != False

  def parseRequest(self):

    # Build statement and execute
    exec_string = ''
   
##  def _get(self):
##    exec_string = ''
##    if self.request_object['get_params']['id']: # Get by ID
##      exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.get(pk='+self.request_object['get_params']['id']+')'
##    elif self.request_object['get_params']['num']:
##      exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'date_published\').get(pk='+self.request_object['get_params']['num']+')'
##    elif self.request_object['get_params']['title']:
##      exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.order_by(\'date_published\').get(pk='+self.request_object['get_params']['num']+')'
##
##    else: # Default - limit 10
##      exec_string = 'self.response_object = '+self.object_types_callable[self.request_object['object_name']]+'.objects.all()[:10]'
##
##    code = compile(exec_string,'<string>','exec')
##    exec code

  def getResp(self):
    return self.response_object
