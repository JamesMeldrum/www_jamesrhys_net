from django.db import models
from app.models import Tags

# Models for the labs section
# For now, just derp the herp and edit site assets manually
# Dont want this to get too hard to manage code and its display

class Experiment(models.Model):
   tags = models.ForeignKey(Tags)
   title = models.CharField(max_length=50)
   description = models.TextField(max_length=300)
   published = models.DateTimeField([False,True])
   last_modified = models.DateTimeField([True,True])
