from django.db import models

# Create your models here.
class User(models.Model) : 
    name = models.CharField(max_length=300)
    address = models.TextField()
    age = models.IntegerField()
    
    def __str__(self) : 
        return f"{self.name}"