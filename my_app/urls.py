# my_app/urls.py

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import map_view

urlpatterns = [
    path('', views.home, name='home'),
    path('map/', views.map_view, name='map'),
    path('login/', views.login_view, name='login'),
    path('rate_site/', views.rate_site, name='rate_site'),
    path('submit_rating/', views.submit_rating, name='submit_rating'),
    path('get_ratings/<int:site_id>/', views.get_ratings, name='get_ratings'),
    path('get_average_rating/<int:site_id>/', views.get_average_rating),
]