from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import like_dislike_post, add_comment,get_post_detail , create_post, get_post,delete_post
from .views import LoginView, RegisterView ,ResetPasswordView,ForgotPasswordView,UserView,FollowView
from rest_framework.authtoken.views import obtain_auth_token
from .views import like_dislike_post, add_comment

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
		path('reset-password/<str:uid>/<str:token>', ResetPasswordView.as_view(), name='reset-password'),
		path('users/', UserView.as_view(), name='users'),
  	path('follows/', FollowView.as_view(), name='follows'),
    # -------------path quang------------------------
    path('posts/',get_post, name = 'list-post'),
    path('posts/create/',create_post, name = 'create-post'),
    path('posts/detail/<int:postID>',get_post_detail, name = 'detail-post'),
    path('posts/delete/<int:postID>',delete_post, name = 'detail-post'),
    path('api-token/', obtain_auth_token, name='api_token'),
    # -------------end path quang------------------------

    #---------------Trong--------------
    path('likes/', like_dislike_post, name='like-dislike'),
    path('comments/', add_comment, name='add-comment'),

]
