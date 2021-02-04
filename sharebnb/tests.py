from django.test import TestCase

# Create your tests here.

""" 
>>> import Booking from models
  File "<console>", line 1
    import Booking from models
                   ^
SyntaxError: invalid syntax
>>> from sharebnb.models  import Booking
>>> from sharebnb.models  import CustomUser, Listing
>>> me = CustomUser.objects.first()
>>> me
<CustomUser: User j.lei>
>>> listing = Listing.objects.first()
>>> from django.utils import timezone
>>> from datetime import timedelta
>>> newBooking = Booking(guest=me, listing=listing, total_price=100, start_time=timezone.now, end_time=timezone.now+timedelta(days=1), duration=timedelta(days=1))
Traceback (most recent call last):
  File "<console>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'function' and 'datetime.timedelta'
>>> newBooking = Booking(guest=me, listing=listing, total_price=100, start_time=timezone.now(), end_time=timezone.now()+timedelta(days=1), duration=timedelta(days=1))
>>> newBooking
<Booking: Booking None>
>>> newBooking.duration
datetime.timedelta(days=1)
>>> 
 """


 """ test check availibility
  
from sharebnb.models import CustomUser, Listing, Booking
from django.utils import timezone
from datetime import timedelta
from psycopg2.extras import DateTimeTZRange, DateTimeRange

b1 = Booking.objects.first()
l1 = Listing.objects.first()

test_start = timezone.now()
test_end = timezone.now() + timedelta(hours=3)
l1.check_availability(test_start, test_end)
 
Booking.objects.filter(start_time__contained_by=DateTimeTZRange(timezone.now() - datetime.timedelta(hours=1),timezone.now() + datetime.timedelta(hours=1),)
TestRange.objects.filter(date_range__contained_by=DateTimeTZRange(timezone.now() - datetime.timedelta(hours=1),timezone.now() + datetime.timedelta(hours=1),)

 
  """
#newBooking = Booking(guest=me, listing=listing, total_price=100, start_time=timezone.now(), end_time=timezone.now()+timedelta(days=1), duration=timedelta(days=1))