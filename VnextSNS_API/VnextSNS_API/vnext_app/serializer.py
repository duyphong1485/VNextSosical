from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from .models import UserProfile, Post

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

class ForgotPasswordSerializer(serializers.Serializer):
		email = serializers.EmailField()
		def validate(self, data):
			email = data.get("email")
			if not UserProfile.objects.filter(email=email).exists():
					raise serializers.ValidationError("Email is not registered")
			return data
		def save(self):
			email = self.validated_data['email']
			user = UserProfile.objects.get(email=email)
			token_generator = PasswordResetTokenGenerator()
			token = token_generator.make_token(user)
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			reset_url = f"http://localhost:3000/reset-password/{uid}/{token}"
			from django.core.mail import send_mail
			subject = "Reset Password"
			message = f"Click on the link to reset your password {reset_url}"
			send_mail(subject, message,'duyphong1485@gmail.com', [email])
			return {"message": "The link to reset your password has been sent to your email"}

class ResetPasswordSerializer(serializers.Serializer):
		uid = serializers.CharField()
		token = serializers.CharField()
		new_password = serializers.CharField(write_only=True,max_length=8)
		def validate(self,data):
			try:
				uid = force_bytes(urlsafe_base64_decode(data['uid']))
				user = UserProfile.objects.get(pk=uid)
			except(TypeError, ValueError, OverflowError, UserProfile.DoesNotExist):
				raise serializers.ValidationError("Invalid the link reset password")
			token_generator = PasswordResetTokenGenerator()
			if not token_generator.check_token(user, data['token']):
				raise serializers.ValidationError("Token is not valid")
			data['user'] = user
			return data
		def save(self):
			user = self.validated_data['user']
			user.set_password(self.validated_data['new_password'])
			user.save()
			return {"message": "Password has been reset"}









# ---------------------------------------start Serializer (quang do)---------------------------------------------------------------------
class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all(),write_only=True)
    class Meta:
        model = Post
        fields = ['id' , 'user', 'contest','created_at','updated_at']


# ---------------------------------------end Serializer (quang do)------------------------------------------------------------------------
