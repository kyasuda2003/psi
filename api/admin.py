from django.contrib import admin

from proxicode.api.models import Media, Action, Scheduler, Status, Category, Photo, Product, Account

class AccountAdmin(admin.ModelAdmin):
    pass

#@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

#@admin.register(Picture)
class PhotoAdmin(admin.ModelAdmin):
    pass

#@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

class MediaAdmin(admin.ModelAdmin):
    pass

class ActionAdmin(admin.ModelAdmin):
    pass

class SchedulerAdmin(admin.ModelAdmin):
    pass

class StatusAdmin(admin.ModelAdmin):
    pass

admin.site.register(Account, AccountAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Media, MediaAdmin)
admin.site.register(Action, ActionAdmin)
admin.site.register(Scheduler, SchedulerAdmin)
admin.site.register(Status,StatusAdmin)
