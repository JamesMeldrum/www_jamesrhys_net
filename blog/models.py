from django.db import models

# Create your models here.

class Post(models.Model):
    pub_date = models.DateTimeField('date published')

