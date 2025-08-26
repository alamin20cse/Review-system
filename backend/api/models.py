from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    photo = models.ImageField(upload_to='user_photos/', null=True, blank=True)
    is_blocked = models.BooleanField(default=False)



class Category(models.Model):
    title = models.CharField(max_length=199)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,blank=True, null=True)
    image = models.ImageField(upload_to="products/")
    marcket_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField()
    def __str__(self):
        return self.title
    

class Review(models.Model):
    description=models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    email=models.EmailField()
    image = models.ImageField(upload_to="review/")
    def __str__(self):
        return self.email
    
        
