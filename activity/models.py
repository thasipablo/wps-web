from django.db import models


class Attendance(models.Model):
    rf_id = models.CharField(max_length=50)
    date = models.DateField(auto_now=True, auto_now_add=False)
    