from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import UserProfile

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
            username = data.get("username")
            password = data.get("password")
            if username and password:
                user = authenticate(username=username, password=password)
                if user:
                    if not user.is_active:
                        raise serializers.ValidationError("User is not active")
                else:
                    raise serializers.ValidationError(
                        "User is password is not correct")
            else:
                raise serializers.ValidationError(
                    "Plesae provide username and password")
            data["user"] = user
            return data

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8)
    class Meta:
        model = UserProfile
        fields = ['username','email','password']
    def create(self, validated_data):
      user = UserProfile.objects.create_user(
          validated_data['username'],
          validated_data['email'],
          validated_data['password']
      )
      return user
    def validate(self,data):
      if UserProfile.objects.filter(email=data['email']).exists():
          raise serializers.ValidationError("Email already exists")
      if UserProfile.objects.filter(username=data['username']).exists():
          raise serializers.ValidationError("Username already exists")
      return data

