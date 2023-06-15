from django.shortcuts import render
from . models import User
from django.views.generic import ListView

# Create your views here.

class UserListView(ListView) : 
    model = User
    template_name = 'index.html'
    context_object_name = 'users'