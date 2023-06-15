
from django.http import JsonResponse
from django.urls import reverse
from . models import User
from django.views.generic import ListView,View

# Create your views here.

class UserListView(ListView) : 
    model = User
    template_name = 'index.html'
    context_object_name = 'users'
    
class UserCreateView(View) : 
    def get(self,request) : 
        name = request.GET.get('name',None)
        address = request.GET.get('address',None)
        age = request.GET.get('age',None)
        
        user_obj = User.objects.create(name=name,address=address,age=age)
        
        user = {
            'id':user_obj.id,
            'name':user_obj.name,
            'address':user_obj.address,
            'age':user_obj.age
        }
        
        data = {
            'user':user
        }
        
        return JsonResponse(data)
