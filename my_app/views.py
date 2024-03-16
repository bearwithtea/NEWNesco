# my_app/views.py

from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse

def home(request):
    return render(request, 'home.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return HttpResponse("Logged in successfully")
        else:
            return HttpResponse("Invalid username or password")
    else:
        return render(request, 'registration/login.html')
    
def map_view(request):
    return render(request, 'map.html')