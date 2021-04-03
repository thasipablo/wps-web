
from django.urls import path

from .views import StudentAPIView


app_name = 'student'

urlpatterns = [
    path('students', StudentAPIView.as_view(), name='students_list')
]
