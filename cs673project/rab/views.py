from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from .utils.validation import validate_registration
from .utils.model_helper import create_user
from .models import User, Restaurant, Role
import json
# Create your views here.

def index(request):
    if request.user.is_anonymous:
        return render(request, 'login.html')
    else:
        return render(request, 'manager.html')

@require_http_methods(['POST'])
def sign_up(request):
    username = request.POST['username']
    password = request.POST['pass']
    if validate_registration(username, password):
        user = create_user(username,password,1)
        login(request, user)
        return redirect('manager')
    else:
        return redirect('')

@require_http_methods(['POST'])
def login_user(request):
    username = request.POST['username']
    password = request.POST['pass']
    user = authenticate(username = username, password = password)
    if user is not None:
        login(request, user)
        return redirect('manager')
    else:
        return redirect('')     

@login_required
def manager(request):
    if(request.user.role.id == 1):
        return render(request, 'manager.html')
    else:
        return redirect('')


@login_required
def manager_personal(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_personal.html')
    else:
        return redirect('')

@login_required
def manager_restaurant(request):
    if(request.user.role.id == 1):
        restaurant = Restaurant.objects.get(pk=request.user.restaurant.id)
        return render(request, 'manager_restaurant.html', {"restaurant":restaurant})
    else:
        return redirect('')

@login_required
def manager_menu(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_menu.html')
    else:
        return redirect('')

@login_required
def manager_menu_detail(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_menu_detail.html')
    else:
        return redirect('')

@login_required
def manager_status(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_status.html')
    else:
        return redirect('')

@login_required
def manager_status_detail(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_status_detail.html')
    else:
        return redirect('')

@login_required
def manager_employee(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_employee.html')
    else:
        return redirect('')

@login_required
def manager_employee_detail(request):
    if(request.user.role.id == 1):
        return render(request, 'manager_employee_detail.html')
    else:
        return redirect('')

@require_http_methods(['POST'])
def manager_personal_update(request):
    username = request.POST['username']
    first_name = request.POST['firstname']
    last_name = request.POST['lastname']
    password = request.POST['pass']
    user = request.user
    user.first_name = first_name
    user.last_name = last_name
    user.username = username
    user.set_password(password)
    user.save()
    login(request, user)
    data = {"firstname": first_name, "lastname": last_name, "username": username}
    #return redirect('manager_personal')
    return HttpResponse(json.dumps(data))
    #return render(request, 'manager_personal.html')

@require_http_methods(['POST'])
def manager_restaurant_update(request):
    name = request.POST['name']
    address = request.POST['address']
    phone = request.POST['phone']
    open_time = request.POST['open-time']
    close_time = request.POST['close-time']
    restaurant = Restaurant.objects.get(pk=request.user.restaurant.id)
    restaurant.name = name
    restaurant.address = address
    restaurant.phone = phone
    restaurant.open_time = open_time
    restaurant.close_time = close_time
    restaurant.save()
    data = {"name": name, "address": address, "phone": phone, "open_time": open_time, "close_time": close_time}
    #return redirect('manager_personal')
    return HttpResponse(json.dumps(data))
    #return render(request, 'manager_personal.html')