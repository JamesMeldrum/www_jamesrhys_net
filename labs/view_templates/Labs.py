"""
    Author: JRM
    Date: 11/27/2012
    Desc: 

    TODO: Refactor admin! Creating a Lab in the admin should bootstrap the src files

"""

from app.view_templates.JRMBase import JRMDetailView
from api.models import Experiment 

class LabDetailView(JRMDetailView):

   context_object_name = 'experiment'
   model = Experiment
   
   def get_queryset(self):
       self.experiment = get_object_or_404(Experiment, id__exact=self.args[0])
       return Experiment.objects.filter(id=self.experiment)

   def get_context_data(self, **kwargs):
       self.template_name = 'labs/frontend/'+str(self.args[0])+'/index.html'
       context = super(LabDetailView, self).get_context_data(**kwargs)
       context['experiment'] = self.experiment
       return context 
