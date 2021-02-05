from datetime import datetime
from typing import List
from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from sharebnb.models import Listing, CustomUser
from ninja import File, Router
from ninja.files import UploadedFile
from .boto3_upload import upload_image


# DO S3 FIRST THING!!!!!! or django-storage

router = Router()

class User(Schema):
    id: int
    first_name: str
    last_name: str


class PathDateTime(Schema):
    year: int
    month: int
    day: int

    def value(self):
        return datetime.date(self.year, self.month, self.day)


class ListingIn(Schema):
    user: User
    address: str
    price_per_hour: str = None
    price_per_day: str = None
    price_per_month: str = None
    description: str = None
    max_guests: int
    title: str = None
    listing_type: str = "backyard"


class ListingOut(Schema):
    id: int
    user: User
    address: str
    price_per_hour: str = None
    price_per_day: str = None
    price_per_month: str = None
    description: str = None
    max_guests: int
    title: str = None
    listing_type: str = "backyard"
    rating: int
    created_date: PathDateTime


@router.get('/hello')
def hello(request):
    return {"hello": "world"}

@router.post("/")
def create_listing(request, payload: ListingIn, file: UploadedFile = File(...)):
    image_url = upload_image(file)
    new_listing_data = payload.dict()
    new_listing_data["images_url"] = image_url
    listing = Listing.objects.create(**new_listing_data)
    print(listing)
    return {"id": listing.id}


@router.get("/{listing_id}", response=ListingOut)
def get_listing(request, listing_id: int):
    listing = get_object_or_404(Listing, id=listing_id)
    return listing


@router.get("/", response=List[ListingOut])
def list_(request):
    qs = Listing.objects.all()
    return qs


@router.put("/{listing_id}")
def update_listing(request, listing_id: int, payload: ListingIn):
    listing = get_object_or_404(Listing, id=listing_id)
    for attr, value in payload.dict().items():
        setattr(listing, attr, value)
    listing.save()
    return {"success": True}


@router.delete("/{listing_id}")
def delete_listing(request, listing_id: int):
    listing = get_object_or_404(Listing, id=listing_id)
    listing.delete()
    return {"success": True}
