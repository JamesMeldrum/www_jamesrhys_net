import datetime
from django.utils import timezone
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic

class Tag(models.Model):
  title = models.CharField(max_length = 50)

  def __unicode__(self):
    return self.title

class BlogPost(models.Model):
  date_published = models.DateTimeField()
  title = models.CharField(max_length = 100, db_index = True)
  subtitle = models.CharField(max_length = 250)
  body = models.TextField() # No max length is default by Django
  tags = models.ManyToManyField(Tag) # Sets FK on tags
 
  def __unicode__(self):
    return self.title

class Experiment(models.Model):
  title = models.CharField(max_length=50, db_index = True)
  body = models.TextField() 
  date_published = models.DateTimeField()
  tags = models.ManyToManyField(Tag)
  thumbnail = models.ImageField(upload_to='thumbs')
  
  def __unicode__(self):
    return self.title

class Product(models.Model):
  title = models.CharField(max_length=50, db_index = True)
  body = models.TextField() 
  date_description = models.CharField(max_length=100)
  tags = models.ManyToManyField(Tag)
  technologies = models.TextField(max_length=500)
  goals = models.TextField(max_length=500)
  thumbnail = models.ImageField(upload_to='thumbs')

  def __unicode__(self):
    return self.title

class Talks(models.Model):
  title = models.CharField(max_length=50, db_index = True)
  description = models.TextField(max_length=300, blank = True) # Max length set for description field
  body = models.TextField()
  date_published = models.DateTimeField()
  tags = models.ManyToManyField(Tag)
  slide_deck_url = models.CharField(max_length=200, blank=True)

  def __unicode__(self):
    return self.title

class Images(models.Model):

  """
  
    Stores images used in all parts of the application. Depends on generic foreign key relations
    https://docs.djangoproject.com/en/1.3/ref/contrib/contenttypes/#generic-relations
  
  """
  title = models.CharField(max_length=50)
  caption = models.CharField(max_length=150,blank=True)
  image = models.ImageField(upload_to='uploads')
  content_type = models.ForeignKey(ContentType)
  object_id = models.PositiveIntegerField()
  content_object = generic.GenericForeignKey('content_type','object_id') # These text fields are refs to the named fields of this model (Images)

  def __unicode__(self):
    return self.title
