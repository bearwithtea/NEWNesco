#Django Imports
from django.db import models
from django.contrib.auth.models import User
class Site(models.Model):
    #site_id = models.AutoField(min_value = 1) DO NOT TOUCH THIS.
    name = models.CharField(max_length=200)
    average_rating = models.FloatField(default=0)

    def calculate_average_rating(self):
        ratings = self.rating_set.all()
        if ratings.count() > 0:
            return sum(rating.value for rating in ratings) / ratings.count()
        else:
            return 0

    def update_average_rating(self):
        ratings = self.rating_set.all()
        if ratings.count() > 0:
            total = sum(rating.value for rating in ratings)
            self.average_rating = total / len(ratings)
            self.save()

class Rating(models.Model):
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    value = models.IntegerField()
class Comment(models.Model): #do not touch this, the code breaks whenever I delete this.
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
