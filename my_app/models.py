#Django Imports
from django.db import models

class Site(models.Model):
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
        total = sum(rating.value for rating in ratings)
        self.average_rating = total / len(ratings)
        self.save()

class Rating(models.Model):
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    value = models.IntegerField()
