from datetime import datetime
from typing import List
from ninja import NinjaAPI, Schema, Form
from django.shortcuts import get_object_or_404
from sharebnb.models import Listing, CustomUser
from django.contrib.auth.models import User as UserModel
from ninja import File, Router
from ninja.files import UploadedFile
from .boto3_upload import upload_image



# DO S3 FIRST THING!!!!!! or django-storage

router = Router()


class FileSchema(Schema):
    image_file: UploadedFile = File(...)


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


class ListingIn(Schema):
    username: str
    location: str
    price_per_hour: str = None
    price_per_day: str = None
    price_per_month: str = None
    description: str = None
    max_guests: int
    title: str = None
    listing_type: str = "backyard"


class ListingOut(Schema):
    id: int
    user: User = None
    address: str = None
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
# , payload: ListingIn, file: UploadedFile = File(...)
def create_listing(request, payload: ListingIn):
    print("create_listing ran")
    user = UserModel.objects.get(username=payload.username)
    host = CustomUser.objects.get(user=user)
    new_listing_data = {
        "user": host,
        "location": payload.location,
        "price_per_hour": payload.price_per_hour,
        "price_per_day": payload.price_per_day,
        "price_per_month": payload.price_per_month,
        "description": payload.description,
        "max_guests": payload.max_guests,
        "title": payload.title,
        "listing_type": payload.listing_type
    }
    listing = Listing.objects.create(**new_listing_data)
    return {"id": listing.id}


@router.post("/{listing_id}/image-upload/")
def upload_form_image(request, listing_id: int, file: UploadedFile = File(...)):
    print("upload ran")
    image_url = upload_image(file)
    listing = Listing.objects.get(id=listing_id)
    listing.image_url = image_url
    listing.save()
    return {"msg": "upload successful"}


@router.get("/", response=List[ListingOut])
def list_(request):
    qs = Listing.objects.all()
    return qs


@router.get("/{listing_id}", response=ListingOut)
def get_listing(request, listing_id: int):
    listing = get_object_or_404(Listing, id=listing_id)
    return listing




@router.put("/{listing_id}")
def update_listing(request, listing_id: int, payload: ListingIn):
    user = User.objects.get(username=payload.username())
    host = CustomUser.objects.get(user=user)
    # TODO: fix this 
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
