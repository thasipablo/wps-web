from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=200)
    post_name = models.CharField(max_length=200)
    forename = models.CharField(max_length=200)
    matricule = models.CharField(max_length=30)
    rf_id = models.CharField(max_length=200)

    def __str__(self):
        return self.fullname

    @property
    def fullname(self):
        return f'{self.name} {self.post_name} {self.forename}'
