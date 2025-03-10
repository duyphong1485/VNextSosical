from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Comment, Like,  Notification
from .serializer import   LikeSerializer,CommentSerializer, NotificationSerializer

@csrf_exempt
def like_list(request):
    if request.method == 'GET':
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def notification_list(request):
    if request.method == 'GET':
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return JsonResponse(serializer.data, safe=False)
    
