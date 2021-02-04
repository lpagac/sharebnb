from datetime import date
from typing import List
from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from employees.models import Employee


user_api = NinjaAPI()