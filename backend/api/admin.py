from django.contrib import admin
from .models import *



class UserAdmin(admin.ModelAdmin):
    list_display='__all__',
    admin.site.register(User)

class CategoryAdmin(admin.ModelAdmin):
    list_display='__all__',
    admin.site.register(Category)
class ProductAdmin(admin.ModelAdmin):
    list_display='__all__',
    admin.site.register(Product)
class ReviewAdmin(admin.ModelAdmin):
    list_display='__all__',
    admin.site.register(Review)