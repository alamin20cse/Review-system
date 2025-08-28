from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import*
from .serializers import*
from rest_framework.decorators import action

 





# Create your views here.


User = get_user_model()

# -------------------------
# User Registration
# -------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]  # Anyone can register
# 


# -------------------------
# User ViewSet (Profile)
# -------------------------
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
#GET /api/user/profile/
# api/router register name/functon name/
    @action(detail=False, methods=['get'])
    def profile(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    


from rest_framework import generics, mixins, filters
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializers

class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    permission_classes = [AllowAny]
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializers
    lookup_field = "id"

    # Search filter যোগ করা হলো
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']  # এখানে কোন কোন ফিল্ডে search হবে তা নির্ধারণ করা হলো

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)



class CatagoryViewset(viewsets.ViewSet):
    permission_classes = [AllowAny, ]
    def list(self,request):
        query = Category.objects.all()
        serializer = CatagorySerializer(query,many=True)
       
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        query = Category.objects.get(id=pk)
        serializer = CatagorySerializer(query)
        data_data = serializer.data
        all_data = []
        catagory_product = Product.objects.filter(category_id=data_data['id'])
        catagory_product_serilazer = ProductSerializers(catagory_product,many=True)
        data_data['category_product'] = catagory_product_serilazer.data
        all_data.append(data_data)
        return Response(all_data)




class ReviewViewset(

    mixins.CreateModelMixin,     # POST
    mixins.ListModelMixin,       # GET (list)
    mixins.RetrieveModelMixin,   # GET (detail)
    mixins.DestroyModelMixin,    # DELETE
    mixins.UpdateModelMixin,     # PUT / PATCH (update)
    viewsets.GenericViewSet
):
    
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer
    def perform_create(self, serializer):
        serializer.save(email=self.request.user.email) 
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:  # create, update, partial_update, destroy
            permission_classes = [IsAuthenticated,]
        return [permission() for permission in permission_classes]



# views.py
from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer

class ForSpecificProductReview(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes=[AllowAny]

    # Get reviews filtered by product_id from URL
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')  # get product_id from URL
        return Review.objects.filter(product=product_id)  # filter reviews for this product
