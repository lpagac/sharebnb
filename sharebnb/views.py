from django.shortcuts import render

# Create your views here.


def bookingForm(request):
    return render(request, 'index.html')
