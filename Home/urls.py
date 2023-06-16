from django.urls import path
from .views import *

app_name = 'Home'

urlpatterns = [
    path('',UserListView.as_view(),name='user-list'),
    path('create-user/',UserCreateView.as_view(),name='create_user'),
    path('update-user/',UserUpdateView.as_view(),name='update_user'),
]
