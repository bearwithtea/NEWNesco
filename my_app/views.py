# my_app/views.py

from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse

def home(request):
    return render(request, 'home.html')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return redirect('map')
        else:
            return HttpResponse("Invalid username or password :(. Please give it another show.")
    else:
        form = AuthenticationForm()
        return render(request, 'registration/login.html', {'form': form})
    
def map_view(request):
    return render(request, 'map.html')