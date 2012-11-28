from django.contrib import admin
from labs.models import Experiment 

## Custom ModelAdmin objects where needed

#class SiteMetaDataAdmin(admin.ModelAdmin):
#    list_display = ('meta_key','meta_var','site_section') # Used to show the attrs on the list page
#    list_filter = ('site_section','meta_key','meta_var') # Creates filter on right of page
#    pass

#class ChoiceInline(admin.TabularInline):
#    model = Choice
#    extra = 3
#    
#
#class PollAdmin(admin.ModelAdmin):
#    #fields = ['pub_date', 'question']
#    fieldsets = [
#        (None, {'fields':['question']}),
#        ('Date Information', {'fields':['pub_date'],'classes':['collapse']}),
#        ]
#
#    inlines = [ChoiceInline]
#
#    list_display = ('question', 'pub_date','was_published_recently')
#
#    list_filter = ['pub_date']
#
#    search_fields = ['question']
#
#    date_heirarchy = 'pub_date'
#
#admin.site.register(Poll,PollAdmin)

## Adding the admin fields to the admin

admin_fields = [Experiment]
#custom_admin_fields = [(SiteMetaData,SiteMetaDataAdmin)]

for field in admin_fields:
    admin.site.register(field)

#for custom_admin_tuple in custom_admin_fields:
#    admin.site.register(custom_admin_tuple[0],custom_admin_tuple[1])

