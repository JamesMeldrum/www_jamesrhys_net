"""
    TODO: Restrict fk's on Tags and Images manually https://docs.djangoproject.com/en/dev/ref/contrib/admin/#using-generic-relations-as-an-inline
"""


from django.contrib import admin
from api.models import Tag, BlogPost, Experiment, Product, Talks, Images

## Custom ModelAdmin objects where needed

class SiteMetaDataAdmin(admin.ModelAdmin):
    list_display = ('meta_key','meta_var','site_section') # Used to show the attrs on the list page
    list_filter = ('site_section','meta_key','meta_var') # Creates filter on right of page

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

admin_fields = [Tag, BlogPost, Experiment, Product, Talks, Images]

for field in admin_fields:
    admin.site.register(field)
