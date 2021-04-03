from django.urls import path

from .views import AttendanceAPIView

app_name = 'activity'

urlpatterns = [
    path('attendances', AttendanceAPIView.as_view(), name='attendance')
]
