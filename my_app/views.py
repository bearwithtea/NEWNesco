# Django imports
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django import forms
from django.db.models import Avg
from django.contrib.auth.forms import AuthenticationForm
from .models import Comment

# Local imports
from .models import Site, Rating

def home(request):
    return render(request, 'my_app/home.html')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return redirect('map')
        else:
            return HttpResponse("Invalid username or password :(. Please give it another shot.")
    else:
        form = AuthenticationForm()
        return render(request, 'registration/login.html', {'form': form})
     
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return redirect('map')
    else:
        return render(request, 'register.html')

@login_required     
def map_view(request):
    sites = Site.objects.all()
    if not sites:
        site = Site(name='Test Site')
        site.save()
        sites = Site.objects.all()
    return render(request, 'my_app/map.html', {'sites': sites})

def rate_site(request):
    if request.method == 'POST':
        site_id = request.POST.get('site_id')
        rating = request.POST.get('rating')
        site = Site.objects.get(id=site_id)
        site.update_average_rating(float(rating))
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})
    
def submit_rating(request, site_id):
    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():
            site_id = form.cleaned_data['site_id']
            rating_value = form.cleaned_data['rating']
            site = Site.objects.get(id=site_id)
            Rating.objects.create(site=site, value=rating_value)
            site.update_average_rating()
            return redirect('map_view')
        else:
            # handle the case where the form is not valid
            return render(request, 'my_app/submit_rating.html', {'form': form})
    else:
        form = RatingForm()
        return render(request, 'my_app/submit_rating.html', {'form': form})
    
def get_ratings(request, site_id):
    site = Site.objects.get(id=site_id)
    ratings = list(site.rating_set.values())
    average_rating = site.rating_set.aggregate(Avg('value'))['value__avg']
    return JsonResponse({'ratings': ratings, 'average_rating': average_rating})

from django.db.models import Avg

def get_average_rating(request, site_id):
    site = get_object_or_404(Site, id=site_id)
    average_rating = Rating.objects.filter(site=site).aggregate(Avg('value'))['value__avg']
    return JsonResponse({'average_rating': average_rating})

def get_site_data(request, site_id):
    site = get_object_or_404(Site, id=site_id)
    data = {
        'id': site.id,
        'name': site.name,
        'average_rating': site.average_rating,
    }
    return JsonResponse(data)

class RatingForm(forms.Form): 
    site_id = forms.IntegerField(widget=forms.HiddenInput())
    rating = forms.IntegerField(
        min_value=1, 
        max_value=5, 
        error_messages={
            'required': 'Please enter a rating between 1 and 5.',
            'invalid': 'Please enter a valid integer.',
        }
    )

from django.http import JsonResponse
from .models import Site

def get_all_site_ids(request):
    site_ids = list(Site.objects.values_list('id', flat=True))
    return JsonResponse({'site_ids': site_ids})