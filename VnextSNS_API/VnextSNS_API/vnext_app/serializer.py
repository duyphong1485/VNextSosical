from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from .models import UserProfile, Post, Follow,User
from .models import Like, Comment

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
    password = serializers.CharField(write_only=True, min_length=8)
    password_again = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField()
    date_of_birth = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'password_again', 'date_of_birth']

    def validate_email(self, value):
        # Check email format
        if not value:
            raise serializers.ValidationError("Email is required")

        # Check valid email domain
        allowed_domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'vnext.vn']
        domain = value.split('@')[-1].lower()
        if domain not in allowed_domains:
            raise serializers.ValidationError(
                f"Email domain must be one of: {', '.join(allowed_domains)}"
            )

        # Check if email exists
        if UserProfile.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use")

        return value

    def validate(self, data):
        if data['password'] != data['password_again']:
            raise serializers.ValidationError("Password confirmation does not match")
        if UserProfile.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username is already taken")
        return data

    def create(self, validated_data):
        # Remove password_again from the data
        validated_data.pop('password_again', None)
        user = UserProfile.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            date_of_birth=validated_data.get('date_of_birth')
        )
        return user

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

class UserSerializer(serializers.ModelSerializer):
		class Meta:
				model = UserProfile
				fields = ['id','username','email','profile_picture','bio','personal_link','description']
				read_only_fields = ['id']


# ---------------------------------------start Serializer (quang do)---------------------------------------------------------------------
class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all(),write_only=True)
    class Meta:
        model = Post
        fields = ['id' , 'user', 'contest','created_at','updated_at']


# ---------------------------------------end Serializer (quang do)------------------------------------------------------------------------

#-------------------------Trong-----------------------------------------

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'like_type', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
class FollowSerializer(serializers.ModelSerializer):
		follower = UserSerializer(read_only=True)
		following = UserSerializer(read_only=True)

		class Meta:
			model = Follow
			fields = ['id', 'follower', 'following', 'created_at']
