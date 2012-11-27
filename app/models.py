import datetime
from django.utils import timezone
from django.db import models

# Create your models here.

class Poll(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __unicode__(self):
        return self.question

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
    poll = models.ForeignKey(Poll)
    choice = models.CharField(max_length=200)
    votes = models.IntegerField()

    def __unicode__(self): # Reflected over in admin
        return self.choice

# Core JRM models - used site-wide

class Tags(models.Model):
    title = models.CharField(max_length = 50)
    order = models.IntegerField(blank=True)

class Interests(models.Model):
    title = models.CharField(max_length = 50)
    order = models.IntegerField(blank=True)

class SiteMetaData(models.Model):

    SITE_SECTIONS = (
        (u'C', u'Core'),
        (u'L', u'Lab'),
        (u'B', u'Blog'),
        (u'A', u'App')
    )

    meta_key = models.CharField(max_length = 256)
    meta_var = models.CharField(max_length = 512)
    site_section = models.CharField(max_length=1, choices = SITE_SECTIONS, default='C')

