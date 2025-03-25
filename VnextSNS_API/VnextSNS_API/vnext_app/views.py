from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializer import LoginSerializer, RegisterSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, PostSerializer, UserSerializer, FollowSerializer, LikeSerializer, CommentSerializer
from .models import Post, UserProfile, Follow
from rest_framework import status
from .models import Post, Like, Comment


class LoginView(APIView):
  permission_classes = []

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
    permission_classes = []

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
    permission_classes = []
    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ResetPasswordView(APIView):
    permission_classes = []
    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        serializer = ResetPasswordSerializer(
            data={'uid': uid, 'token': token, 'new_password': request.data['new_password']})
        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
# ------------------------User POST-----------------------------


@api_view(['GET'])
@permission_classes([])
def get_post(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([])
def create_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([])
def get_post_detail(request, postID):
    try:
        post = Post.objects.get(id=postID)
    except Post.DoesNotExist:
        return Response('khong thay bai viet')
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([])
def delete_post(request, postID):
    try:
        post = Post.objects.get(id=postID)
    except Post.DoesNotExist:
        return Response({'detail': 'Bài viết không tồn tại'}, status=status.HTTP_404_NOT_FOUND)

    post.delete()
    return Response({'detail': 'Bài viết đã được xóa'}, status=status.HTTP_204_NO_CONTENT)

# -------------------------end User Post -------------------------------

# -------------------Likes/Comment\-------------------


class LikeView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get('post_id')
        like_type = request.data.get('like_type', 'like')

        if like_type not in ['like', 'dislike']:
            return Response({"detail": "Invalid like type. Must be 'like' or 'dislike'."},
                           status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        like, created = Like.objects.get_or_create(
            user=user,
            post=post,
            defaults={'like_type': like_type}
        )
        if not created:
            like.like_type = like_type
            like.save()

        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


    def delete(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get('post_id')

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        like = Like.objects.filter(user=user, post=post, like_type='like')
        if like.exists():
            like.delete()
            return Response({"detail": "Like removed."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "Not liked yet."}, status=status.HTTP_400_BAD_REQUEST)

class CommentView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        """Lấy danh sách tất cả comment của một post"""
        post_id = request.query_params.get('post_id')
        if not post_id:
            return Response({"detail": "post_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            post = Post.objects.get(id=post_id)
            comments = Comment.objects.filter(post=post)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        """Tạo comment mới"""
        post_id = request.data.get('post_id')
        content = request.data.get('content')
        if not post_id or not content:
            return Response({"detail": "post_id and content are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            post = Post.objects.get(id=post_id)
            comment = Comment.objects.create(post=post, user=request.user.username, content=content)
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        """Cập nhật comment"""
        comment_id = request.data.get('comment_id')
        content = request.data.get('content')
        if not comment_id or not content:
            return Response({"detail": "comment_id and content are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            comment = Comment.objects.get(id=comment_id, user=request.user.username)
            comment.content = content
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        """Xóa comment"""
        comment_id = request.data.get('comment_id')
        if not comment_id:
            return Response({"detail": "comment_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            comment = Comment.objects.get(id=comment_id, user=request.user.username)
            comment.delete()
            return Response({"detail": "Comment deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)


# flow


class FollowView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        """Theo dõi một người dùng khác"""
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required."}, status=status.HTTP401_UNAUTHORIZED)
        follower = request.user
        following_id = request.data.get('following_id')
        try:
            following = UserProfile.objects.get(id=following_id)
            if follower == following:
                return Response({"message": "Can not follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
            if Follow.objects.filter(follower=follower, following=following).exists():
                return Response({"message": "You are already following this user"}, status=status.HTTP_400_BAD_REQUEST)
            follow = Follow.objects.create(
                follower=follower, following=following)
            serializer = FollowSerializer(follow)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except UserProfile.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        user = request.user
        following = Follow.objects.filter(follower=user)
        followers = Follow.objects.filter(following=user)
        data = {
            "following": FollowSerializer(following, many=True).data,
            "followers": FollowSerializer(followers, many=True).data
        }
        return Response(data, status=status.HTTP_200_OK)
