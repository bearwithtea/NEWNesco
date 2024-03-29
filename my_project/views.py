# views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..my_app.models import Site, Rating

@login_required
def home(request):
    return render(request, 'my_app/home.html')

@csrf_exempt
def rate_site(request):
    if request.method == 'POST':
        site_id = request.POST.get('site_id')
        rating = request.POST.get('rating')
        site = Site.objects.get(id=site_id)
        Rating.objects.create(site=site, value=rating)
        return JsonResponse({'success': True})