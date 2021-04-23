from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.urls import reverse

from student.models import Student
from student.forms import StudentForm


def supervisor(request):
    return render(request, 'dashboard/pages/supervisor.html')


def enrolement(request):
    form = StudentForm()

    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()

        return redirect('dashboard:enrolement')
    else:
        students = Student.objects.filter().order_by('-id')[:20]
        context = {
            'form':form,
            'students': students
        }
        return render(request, 'dashboard/pages/enrolement.html', context)


class StudentCreateView(CreateView):
    model = Student
    fields = '__all__'

    def get_absolute_url(self):
        return reverse('dashboard:enrolement')


def administrator(request):
    return render(request, 'dashboard/pages/administrator.html')


def pointage(request):
    return render(request, 'dashboard/pages/pointage.html')
