from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


#create a model for user profile
class UserProfile(AbstractUser):
  profile_picture = models.CharField(max_length=255,blank=True, null=True)
  bio = models.CharField(max_length=255,blank=True, null=True)
  personal_link = models.URLField(max_length=255,blank=True, null=True)
  description = models.CharField(max_length=255,blank=True, null=True, db_column='description')
  date_of_birth = models.DateField(null=True, blank=True)

  class Meta:
    db_table = 'Users'
    constraints = [
			models.UniqueConstraint(fields=['username', 'email'], name='unique_username_email')
		]

# create  model post
class Post(models.Model):
  user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
  contest = models.CharField(max_length=500)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    db_table = 'Posts'

#create model comments
class Comment(models.Model):
  post = models.ForeignKey(Post,on_delete=models.CASCADE)
  user = models.ForeignKey(UserProfile,on_delete=models.CASCADE)
  content = models.CharField(max_length=500)
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = 'Comments'

# create model likes
class Like(models.Model):
    LIKE_TYPE_CHOICES = [
        ('like', 'Like'),
        ('dislike', 'Dislike')
    ]
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    like_type = models.CharField(max_length=7, choices=LIKE_TYPE_CHOICES)

    class Meta:
      db_table = 'Likes'

# create model  follow

class Follow(models.Model):
		follower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='follower')
		following = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='following')
		created_at = models.DateTimeField(auto_now_add=True)

		class Meta:
			db_table = "Follows"
