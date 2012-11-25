from django.contrib import admin
from app.models import Choice
from app.models import Poll

# All that is required to enable the admin i-face
# admin.site.register(Choice)
# admin.site.register(Poll)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3
    

class PollAdmin(admin.ModelAdmin):
    #fields = ['pub_date', 'question']
    fieldsets = [
        (None, {'fields':['question']}),
        ('Date Information', {'fields':['pub_date'],'classes':['collapse']}),
        ]

    inlines = [ChoiceInline]

    list_display = ('question', 'pub_date','was_published_recently')

    list_filter = ['pub_date']

    search_fields = ['question']

    date_heirarchy = 'pub_date'

admin.site.register(Poll,PollAdmin)