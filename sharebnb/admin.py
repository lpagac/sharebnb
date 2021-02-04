from django.contrib import admin
from .models import Listing, CustomUser, Booking

admin.site.register(Listing)
admin.site.register(CustomUser)
admin.site.register(Booking)
# Register your models here.
