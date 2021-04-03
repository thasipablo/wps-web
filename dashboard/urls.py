from django.urls import path

from . import views


app_name = 'dashboard'

urlpatterns = [
    path('supervisor', views.supervisor, name='supervisor'),
    path('pointage', views.pointage, name='pointage'),
    path('enrolement', views.enrolement, name='enrolement'),
    path('record-student', views.StudentCreateView.as_view(), name='record_student'),
    path('administrator', views.administrator, name='administrator')
]
