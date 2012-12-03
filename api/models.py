import datetime
from django.utils import timezone
from django.db import models



class Tag(models.Model):

  """
     Global tags applicable to all site objects.
  """

  title = models.CharField(max_length = 50)

class BlogPost(models.Model):

  """
     Describes a blog post object. 
  """

  # fuck. need to re-implement this without the custom blog_id. its hurting the API
  #blog_id = models.IntegerField(primary_key = True, null = False, unique = True, db_index = True)
  date_published = models.DateTimeField([True,True])
  title = models.CharField(max_length = 50, db_index = True)
  subtitle = models.CharField(max_length = 150)
  body = models.TextField()
  tags = models.ForeignKey('Tag')
 
class Experiment(models.Model):

  """
     Describes an experiment object from the lab.
  """

  title = models.CharField(max_length=50)
  description = models.TextField(max_length=300)
  date_published = models.DateTimeField([True,True])
  tags = models.ForeignKey(Tag)

class Product(models.Model):

  """
     Describes a product I've worked on.
  """

  title = models.CharField(max_length=50)
  description = models.TextField(max_length=300)
  date_started = models.DateTimeField([True,True])
  date_published = models.DateTimeField([True,True])
  tags = models.ForeignKey(Tag)
