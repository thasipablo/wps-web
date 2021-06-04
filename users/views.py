from django.shortcuts import redirect

from  wps.utils import hasGroup

def register(request):
    pass


def redirection(request):
    user = request.user
    if hasGroup(user, 'administrator'):
        return redirect('dashboard:administrator')
    
    else:
        return redirect('dashboard:supervisor')