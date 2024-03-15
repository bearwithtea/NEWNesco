# my_app/urls.py

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import map_view

urlpatterns = [
    path('', views.home, name='home'),
    path('map/', map_view, name='map'),
    path('login/', views.login, name='login'),
]