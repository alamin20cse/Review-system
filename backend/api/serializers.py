from .models import*
from rest_framework import serializers



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'photo', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)  # password auto-hash
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'photo', 'is_staff', 'is_blocked')
  



class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'date', 'image', 'marcket_price', 'selling_price', 'description', 'category']

    def to_representation(self, instance):
        """Override the default representation to replace `image` field with full Cloudinary URL."""
        rep = super().to_representation(instance)
        if instance.image:
            rep['image'] = instance.image.url  # CloudinaryField এর full URL
        return rep


class CatagorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

# serializers.py
# serializers.py
class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('email', 'date')