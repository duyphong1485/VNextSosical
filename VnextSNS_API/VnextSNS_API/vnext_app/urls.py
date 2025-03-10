from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken
from .views import  CommentViewSet, LikeViewSet, NotificationViewSet

urlpatterns = [
    path('api/likes/', LikeViewSet.as_view({'get': 'list', 'post': 'create'}), name='api_likes'),
    path('api/likes/<int:pk>/', LikeViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='api_like_detail'),
    path('api/comments/', CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='api_comments'),
    path('api/comments/<int:pk>/', CommentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='api_comment_detail'),
    path('api/notifications/', NotificationViewSet.as_view({'get': 'list'}), name='api_notifications'),
]
