from django.db import models


class Student(models.Model):

    GENDER = (
        ('F', 'F'),
        ('M', 'M'),
    )

    FACULTIES = (
        ('FASA', 'FASA'),
        ('FASIC', 'FASIC'),
        ('FASEG', 'FASEG'),
        ('FATHEO', 'FATHEO'),
        ('DROIT', 'DROIT'),
    )

    name = models.CharField(max_length=200)
    post_name = models.CharField(max_length=200)
    forename = models.CharField(max_length=200)
    gender = models.CharField(max_length=30, default='M', choices=GENDER)
    matricule = models.CharField(max_length=30)
    faculty = models.CharField(max_length=30, default='FASA', choices=FACULTIES)
    rf_id = models.CharField(max_length=200)

    def __str__(self):
        return self.fullname

    @property
    def fullname(self):
        return f'{self.name} {self.post_name} {self.forename}'
