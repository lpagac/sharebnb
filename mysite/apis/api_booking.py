from datetime import datetime
from typing import List
from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from sharebnb.models import Listing, CustomUser, Booking
from psycopg2.extras import DateTimeTZRange
# from .api_user import api


class User(Schema):
    username: str
    first_name: str
    last_name: str


class PathDateTime(Schema):
    year: int
    month: int
    day: int
 
    def value(self):
        return datetime.date(self.year, self.month, self.day)


class ListingOut(Schema):
    id: int
    user: User
    address: str
    description: str = None
    title: str = None 
    listing_type: str = "backyard"
    rating: int 


class BookingIn(Schema):
    guest: User
    listing_id: int
    num_guests: int
    price_type: str
    start_time: PathDateTime
    end_time: PathDateTime


class TimeRange(Schema):
    start: PathDateTime
    end: PathDateTime

    def value(self):
        return datetime.date(self.year, self.month, self.day)


class BookingOut(Schema):
    guest: User
    num_guests: int
    listing: ListingOut
    price_type: str
    total_price: int
    start: PathDateTime
    end: PathDateTime
    duration: PathDateTime
    confirmed: bool


@api.post("booking/")
def create_booking(request, payload: BookingIn):
    listing = get_object_or_404(Listing, id=payload["listing_id"])
    guest = get_object_or_404(CustomUser, username=payload["guest.username"])
    date_time_range = DateTimeTZRange(payload["start_time"], payload["end_time"])
    duration = Booking.calculate_duration(date_time_range)
    total_price = Booking.calculate_total_price(duration, payload["price_type"], listing)
    booking_data = {
        "guest": guest,
        "num_guests": payload["num_guests"],
        "listing": listing,
        "price_type": payload["price_type"],
        "total_price": total_price,
        "date_time_range": date_time_range,
        "duration": duration,
    }
    booking = Booking.objects.create(**booking_data)
    return {"id": booking.id}


@api.get("booking/{booking_id}", response=BookingOut)
def get_listing(request, booking_id: int):
    booking = get_object_or_404(Listing, id=booking_id)
    booking_return = {
        "guest": booking.guest,
        "num_guests": booking.num_guests,
        "listing": booking.listing,
        "price_type": booking.price_type,
        "total_price": booking.total_price,
        "start": booking.date_time_range.lower,
        "end": booking.date_time_range.upper,
        "duration": booking.duration,
        "confirmed": booking.confirmed,
    }
    return booking_return


@api.put("booking/{booking_id}")
def update_listing(request, booking_id: int, payload: BookingIn):
    booking = get_object_or_404(Booking, id=booking_id)
    listing = get_object_or_404(Listing, id=payload["listing_id"])
    guest = get_object_or_404(CustomUser, username=payload["guest.username"])
    date_time_range = DateTimeTZRange(payload["start_time"], payload["end_time"])
    duration = Booking.calculate_duration(date_time_range)
    total_price = Booking.calculate_total_price(duration, payload["price_type"], listing)
    booking_data = {
        "guest": guest,
        "num_guests": payload["num_guests"],
        "listing": listing,
        "price_type": payload["price_type"],
        "total_price": total_price,
        "date_time_range": date_time_range,
        "duration": duration,
    }
    for attr, value in booking_data.items():
        setattr(booking, attr, value)
    booking.save()
    return {"success": True}


@api.delete("booking/{booking_id}")
def delete_booking(request, booking_id: int):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.delete()
    return {"success": True}
