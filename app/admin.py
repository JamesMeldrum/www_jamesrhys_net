from django.contrib import admin
from app.models import SiteMetaData

## Custom ModelAdmin objects where needed

class SiteMetaDataAdmin(admin.ModelAdmin):
    list_display = ('meta_key','meta_var','site_section') # Used to show the attrs on the list page
    list_filter = ('site_section','meta_key','meta_var') # Creates filter on right of page
    pass

custom_admin_fields = [(SiteMetaData,SiteMetaDataAdmin)]

for custom_admin_tuple in custom_admin_fields:
    admin.site.register(custom_admin_tuple[0],custom_admin_tuple[1])
