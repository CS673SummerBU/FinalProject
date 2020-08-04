from django.shortcuts import render, redirect, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden, HttpResponseRedirect, Http404

from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .utils.validation import validate_registration, validate_dish_input
from .utils.model_helper import create_user ,create_dish, create_menu
from .models import User, Restaurant, Role, Dish, Menu
from datetime import datetime, timedelta
import json
# Create your views here.

def index(request):
    if request.user.is_anonymous:
        return render(request, 'login.html')
    else:
        return redirect_user(request.user.role.id)

def redirect_user(role_id):
    if (role_id == 1):
        return redirect('manager')
    elif (role_id == 2):
        return redirect('waiter')
    elif (role_id == 3):
        return redirect('kitchen')

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
    data = {}
    user = authenticate(username = username, password = password)
    if (user is not None):
        login(request, user)
        return redirect_user(user.role.id)
    else:
        data = {'username': username}
        return JsonResponse(data, safe = False)     

@require_http_methods(['GET'])
def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/rab/')

@require_http_methods(['GET'])
def validate_username(request):
    username = request.GET.get('username', None)
    employeeID = request.GET.get('employeeID',None)
    if (employeeID != None): #changing information of an existing employee
        if (User.objects.filter(username = username, id = employeeID).exists()): #we can change user b/c username and employeeID match
            data = {
                'is_taken': False
            }
        else: 
            if(User.objects.filter(username = username).exists()): #user was trying to change username to someone else's
                data = {
                    'is_taken': True
                }
            else: #user changing username that no one has already
                data = {
                    'is_taken': False
                }
    else: #new user entirely
        data = {
            'is_taken': User.objects.filter(username = username).exists()
        }
    print(data)
    return JsonResponse(data)

@login_required
def manager(request):
    if(request.user.role.id == 1):
        return render(request, 'manager.html')
    else:
        return redirect('')

@login_required
def waiter(request):
    if(request.user.role.id == 2):
        return render(request, 'waiter.html')
    else:
        return redirect('')

@login_required
def kitchen(request):
    if(request.user.role.id == 3):
        return render(request, 'kitchen.html')
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
    return JsonResponse(data)

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
    return JsonResponse(data)


@require_http_methods(['GET'])
def employees(request):
    restaurant_id=request.user.restaurant.id
    if(request.GET.get('employeeID',None) is not None):
        employees = User.objects.filter(restaurant=restaurant_id)
        employee = get_object_or_404(employees, id=request.GET['employeeID'])
        if(employee is None):
            return
        data =  {"id": employee.id, "firstName": employee.first_name, "lastName": employee.last_name, "username": employee.username, "role": employee.role_id}
    else:
        employees = User.objects.filter(restaurant=restaurant_id).exclude(id=request.user.id)
        id = 0
        data = {}
        for emp in employees:
            data[id] = {"id": emp.id, "name": emp.get_full_name()}
            id += 1
    return JsonResponse(data)

@require_http_methods(['GET'])
def dishes(request):
    restaurant_id=request.user.restaurant.id
    if(request.GET.get('dishID',None) is not None):
        dishes = Dish.objects.filter(restaurant_id=restaurant_id)
        dish = get_object_or_404(dishes, id=request.GET['dishID'])
        data = {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url if dish.image else 'none', "serve":dish.serve}
    else:
        dishes = Dish.objects.filter(restaurant_id=restaurant_id)
        id = 0
        data = {}
        for dish in dishes:
            data[id] = {"id": dish.id, "name": dish.name}
            id += 1
    return JsonResponse(data)


@require_http_methods(['GET'])
def menus(request):
    restaurant_id=request.user.restaurant.id
    if(request.GET.get('menuID',None) is not None):
        menus = Menu.objects.filter(restaurant_id=restaurant_id)
        menu = get_object_or_404(menus, id=request.GET['menuID'])
        dishes = Dish.objects.filter(restaurant_id =restaurant_id)
        dish = get_object_or_404(dishes, id=menu.dish_id)
        data =  {"id": menu.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url if dish.image else 'none', "orderStatus" : menu.status.name}
    else:
        menus = Menu.objects.filter(restaurant_id=restaurant_id)
        id = 0
        data = {}
        for menu in menus:
            data[id] = {"id": menu.id, "name": menu.dish.name}
            id += 1
    return JsonResponse(data)

@require_http_methods(['GET'])
def orders(request):
    restaurant_id=request.user.restaurant.id
    orders = Menu.objects.filter(restaurant_id = restaurant_id, status_id = 2)
    id = 0
    data = {}
    for order in orders:
        due = order.last_updated + timedelta(minutes = order.dish.cook_time)
        data[id] = {"id": order.id, "name":order.dish.name, "dueTime": int(due.timestamp()*1000), 'orderStatus': order.status.id}
        id+=1
    return JsonResponse(data)

@require_http_methods(['POST'])
def employee_update(request):
    restaurant_id=request.user.restaurant.id
    employee_id = request.POST.get('employeeID',None)
    username = request.POST['username']
    first_name = request.POST['firstname']
    last_name = request.POST['lastname']
    password = request.POST['pass']
    role_id = request.POST['role']
    employee = None
    if(employee_id is not None):
        employees = User.objects.filter(restaurant=restaurant_id)
        employee = get_object_or_404(employees, id=employee_id)
        employee.first_name = first_name
        employee.last_name = last_name
        employee.username = username
        employee.role_id = role_id
        employee.set_password(password)
        employee.save()
    else:
        if validate_registration(username, password):
            employee = create_user(username,password,role_id,restaurant_id)
            employee.first_name = first_name
            employee.last_name = last_name
            employee.save()
    data =  {"id": employee.id, "firstName": employee.first_name, "lastName": employee.last_name, "username": employee.username, "role": employee.role_id}
    return JsonResponse(data)

@require_http_methods(['POST'])
def dish_update(request):
    #employee_id = request.POST.get('employeeID',None)
    restaurant_id=request.user.restaurant.id
    restaurant = request.user.restaurant
    dish_id = request.POST.get('dishID',None)
    name = request.POST['display-name']
    cook_time = request.POST['cook-time']
    fresh_time = request.POST['fresh-time']
    image = request.FILES.get('food-image',None)
    #serve = request.POST['serve']
    dish = None
    if(dish_id is not None):
        dishes = Dish.objects.filter(restaurant_id=restaurant) 
        dish = get_object_or_404(dishes, id=dish_id)
        dish.name = name
        dish.cook_time = cook_time
        dish.fresh_time = fresh_time
        dish.image = image
        #dish.serve = serve
        dish.save()
    else: #brand new dish
        if validate_dish_input(name, cook_time, fresh_time):
            dish = create_dish(name, cook_time, fresh_time, image, restaurant_id)
            dish.name = name
            dish.cook_time = cook_time
            dish.fresh_time = fresh_time
            dish.save()
    data = {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url if (image) else 'none'}
    return JsonResponse(data)

@require_http_methods(['POST'])
def dish_serve(request):
    restaurant_id=request.user.restaurant.id
    restaurant = request.user.restaurant
    dish_id = request.POST.get('dishID',None)
    serve = request.POST.get('serve-dish')
    data = {}
    dishes = Dish.objects.filter(id = dish_id)
    dish = get_object_or_404(dishes, id=dish_id)
    if (serve == 'true'):
        dish.serve = 1
        if Menu.objects.filter(restaurant_id = restaurant_id, dish_id = dish.id).exists():
            pass
        else:
            menu = create_menu(restaurant_id = restaurant_id, dish_id = dish.id, user_id = request.user.id)
    else:
        dish.serve = 0
        menu = Menu.objects.filter(restaurant_id = restaurant_id, dish_id = dish.id)
        menu.delete()
    dish.save()
    data = {"id": dish_id, "serve": serve}
    return JsonResponse(data)

@require_http_methods(['GET'])
def employee_delete(request):
    restaurant_id=request.user.restaurant.id
    employee_id=request.GET['employeeID']
    employees = User.objects.filter(restaurant=restaurant_id)
    employee = get_object_or_404(employees, id=employee_id)
    employee.delete()
    return HttpResponse("")

@require_http_methods(['GET'])
def dish_delete(request):
    restaurant_id=request.user.restaurant.id
    dish_id=request.GET['dishID']
    dishes = Dish.objects.filter(restaurant=restaurant_id)
    dish = get_object_or_404(dishes, id=dish_id)
    dish.delete()
    return HttpResponse("")

@login_required
@require_http_methods(['GET'])
def restaurant_status(request):
    if(request.user.role.id == 1):
        restaurant_id = request.user.restaurant.id
        status = request.GET.get('status',None)
        restaurant = Restaurant.objects.get(id=restaurant_id)
        if (status == 'true'):
            restaurant.open_status = True
            restaurant.save()
        elif (status == 'false'):
            restaurant.open_status = False
            restaurant.save()
            menu_items = Menu.objects.filter(restaurant_id = restaurant_id)
            if(menu_items is not None):
                menu_items.update(last_served=None, user_id = request.user.id)
    data = {'status': restaurant.open_status}         
    return JsonResponse(data)

@login_required
@require_http_methods(['GET'])
def menu_status(request):
    data = {}
    menu_items = Menu.objects.filter(restaurant_id = request.user.restaurant.id)
    if(request.user.role.id == 2):
        for menu_item in menu_items:
            data[menu_item.id] = {"id": menu_item.id, "name": menu_item.dish.name, "cookTime": menu_item.dish.cook_time, "freshTime": menu_item.dish.fresh_time, 
            'orderStatus': menu_item.status.id, "lastServed": int((menu_item.last_served.timestamp() * 1000)) if menu_item.last_served else 'none',
            'foodImageUrl': menu_item.dish.image.url if (menu_item.dish.image) else 'none'}
    return JsonResponse(data)

@login_required
@require_http_methods(['GET'])
def set_status(request):
    menus = Menu.objects.filter(restaurant_id = request.user.restaurant.id)
    menu_item = get_object_or_404(menus, id=request.GET.get('menuitem',None))
    status = int(request.GET['status'])
    if(request.user.role.id == 2): #waiter
        if(menu_item.status.id == status and status == 3):
            menu_item.status_id = 4
            menu_item.last_served = timezone.now()
        elif(menu_item.status.id == status and (status == 1 or status == 4)):
            menu_item.status_id = 2
    elif(request.user.role.id == 3): #kitchen
        if(status == 2):
            menu_item.status_id = 3
    menu_item.user_id = request.user.id
    menu_item.save()
    return HttpResponse()

def customer(request,restaurant_name):
    name = restaurant_name.replace("_"," ") 
    restaurant = get_object_or_404(Restaurant, name = name)
    return render(request, 'customer.html', {"restaurant" : restaurant })


def customer_menu(request,restaurant_name):
    menu_items = Menu.objects.filter(restaurant_id = request.GET['id'])
    if(menu_items is None):
        raise Http404("Restaurant Not Found")
    data = {}
    for menu_item in menu_items:
        data[menu_item.id] = {"id": menu_item.id, "name": menu_item.dish.name, "freshTime": menu_item.dish.fresh_time, 
        "lastServed": int((menu_item.last_served.timestamp() * 1000)) if menu_item.last_served else 'none',
        'foodImageUrl': menu_item.dish.image.url}
    return JsonResponse(data)
    