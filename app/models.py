import datetime
from django.utils import timezone
from django.db import models
#from etc.meta_data_list import META_KEYS

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

