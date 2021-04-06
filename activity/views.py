from rest_framework.generics import ListAPIView
from rest_framework.generics import ListCreateAPIView

from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceAPIView(ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer