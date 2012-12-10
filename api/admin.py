"""
    TODO: Restrict fk's on Tags and Images manually https://docs.djangoproject.com/en/dev/ref/contrib/admin/#using-generic-relations-as-an-inline
"""

from django.contrib.contenttypes import generic
from django.contrib import admin
from api.models import Tag, BlogPost, Experiment, Product, Talks, Images

## Custom ModelAdmin objects where needed

class SiteMetaDataAdmin(admin.ModelAdmin):
  list_display = ('meta_key','meta_var','site_section') # Used to show the attrs on the list page
  list_filter = ('site_section','meta_key','meta_var') # Creates filter on right of page

class ImagesGeneric(generic.GenericTabularInline):
  model = Images 
# extra = 1

#class ImagesFKInline(admin.TabularInline):
  model = Images

class ProductAdmin(admin.ModelAdmin):
  inlines = (ImagesGeneric,)

#class BlogAdmin(admin.ModelAdmin):
# inlines = [
#   ImagesGeneric
# ]

## Adding the admin fields to the admin

admin_fields = [Tag, Experiment,Talks, Images]

for field in admin_fields:
    admin.site.register(field)

admin.site.register(Product,ProductAdmin)
