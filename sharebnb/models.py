from django.conf import settings
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from address.models import AddressField
from datetime import timedelta, datetime
from psycopg2.extras import DateTimeTZRange
from django.contrib.postgres.fields import DateTimeRangeField

# newBooking = Booking(guest=me, listing=listing, total_price=100, start_time=timezone.now, end_time=timezone.now+timedelta(days=1), duration=timedelta(days=1))
TYPE_CHOICES = (
    ("backyard", "backyard"),
    ("entire_house", "entire house"),
    ("apartment_yard", "apartment yard")
)


PRICE_TYPE = (
    ("hourly", "hourly"),
    ("daily", "daily"),
    ("monthly", "monthly")
)


class CustomUser(models.Model):
    """ extends base django user model"""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_host = models.BooleanField(default=False)
    user_location = models.CharField(
        max_length=100,
        null=False)

    def __str__(self):
        return f"User {self.user}"


class Listing(models.Model):
    """ listing model """
    # meta info
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True
    )
    address = AddressField(null=True)
    price_per_hour = models.IntegerField(validators=[MinValueValidator(0)])
    price_per_day = models.IntegerField(validators=[MinValueValidator(0)])
    price_per_month = models.IntegerField(validators=[MinValueValidator(0)])
    # django storages, 
    images_url = models.CharField(max_length=250)
    description = models.TextField()
    max_guests = models.IntegerField(validators=[MinValueValidator(0)])
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=5
    )
    title = models.CharField(max_length=200)
    location = models.CharField(
        max_length=100,
        null=False)
    listing_type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        null=False,
        default="backyard")
    created_date = models.DateTimeField(default=timezone.now)

    def is_available(self, start, end):
        """ filter out dates before timezone.now
            check if start,end overlaps with any booking for listing
            return Boolean
        """
      
        overlap_bookings = self.booking_set.filter(
            date_time_range__overlap=DateTimeTZRange(start, end)
        )
        return len(overlap_bookings) == 0

    def __str__(self):
        return f"Listing {self.id}: {self.title} in {self.location}"

# search for reservations and dbs
# always available, make sure booking doesn't over lap with other bookings, overlap queries
# popluate a year outward, availible dates


class Booking(models.Model):
    """ bookings model """
    guest = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='guest'
    )
    num_guests = models.IntegerField(default=2, null=False)
    listing = models.ForeignKey(
        Listing,
        on_delete=models.CASCADE
    )
    price_type = models.CharField(
        max_length=20,
        choices=PRICE_TYPE,
        null=False,
        default="daily")
    total_price = models.IntegerField(validators=[MinValueValidator(0)])
    date_time_range = DateTimeRangeField(null=True)
    duration = models.DurationField(default=timedelta(days=1))
    confirmed = models.BooleanField(null=False, default=False)

    @classmethod
    def calculate_duration(cls, date_time_range):
        """ calculate end_time - start_time """

        return date_time_range.upper - date_time_range.lower
    
    @classmethod
    def calculate_total_price(cls, duration, price_type, listing):
        """ Calculate price * duration """

        if price_type == 'hourly':
            return duration.hours * listing.price_per_hour
        if price_type == 'daily':
            return duration.days * listing.price_per_day
        if price_type == 'monthly':
            return duration.months * listing.price_per_month

    def __str__(self):
        return f"Booking {self.id}"
