from django.urls import path, include, re_path
from rest_framework import routers


from .views import*


route=routers.DefaultRouter()

route.register('user', UserViewSet, basename='user')  # for profile endpoint
route.register('categori',CatagoryViewset,basename='CategoryView'),
route.register('review',ReviewViewset , basename='review') 



urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path('product/',ProductView.as_view(),name='product'),
    path('product/<int:id>/',ProductView.as_view(),name='product-details'),
path('product-reviews/<int:product_id>/', ForSpecificProductReview.as_view(), name='product-reviews'),
    
    

    path("", include(route.urls)),
    
]
