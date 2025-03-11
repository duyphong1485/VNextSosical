from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializer import LoginSerializer, RegisterSerializer,ForgotPasswordSerializer,ResetPasswordSerializer, PostSerializer
from .models import Post


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
  def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
		def post(self, request, *args, **kwargs):
				uid = request.data.get('uid')
				token = request.data.get('token')
				serializer = ResetPasswordSerializer(data={'uid': uid, 'token': token, 'new_password': request.data['new_password']})
				if serializer.is_valid():
						result = serializer.save()
						return Response(result, status=status.HTTP_200_OK)
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ------------------------User POST-----------------------------
@api_view(['GET'])
def get_post(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def create_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_post_detail(request,postID):
    try:
        post = Post.objects.get(id=postID)
    except Post.DoesNotExist:
        return Response('khong thay bai viet')
    serializer = PostSerializer(post)
    return Response(serializer.data)
@api_view(['DELETE'])
def delete_post(request, postID):
    try:
        post = Post.objects.get(id=postID)
    except Post.DoesNotExist:
        return Response({'detail': 'Bài viết không tồn tại'}, status=status.HTTP_404_NOT_FOUND)

    post.delete()
    return Response({'detail': 'Bài viết đã được xóa'}, status=status.HTTP_204_NO_CONTENT)

# -------------------------end User Post -------------------------------
