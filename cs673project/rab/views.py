from django.shortcuts import render, redirect, get_object_or_404, get_list_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .utils.validation import validate_registration, validate_dish_input
from .utils.model_helper import create_user ,create_dish, create_menu
from .models import User, Restaurant, Role, Dish, Menu
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
    user = authenticate(username = username, password = password)
    if (user is not None):
        login(request, user)
        return redirect_user(user.role.id)
    else:
        return redirect('')     

@require_http_methods(['GET'])
def logout_user(request):
    logout(request)
    return render(request, 'login.html')

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
        if (dish.image): 
            data =  {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url, "serve":dish.serve}
        else:
            data =  {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "serve":dish.serve}
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
        if (dish.image):
            data =  {"id": menu.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url, "orderStatus" : menu.order_state}
        else:
            data =  {"id": menu.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "orderStatus" : menu.order_state}   
    else:
        menus = Menu.objects.filter(restaurant_id=restaurant_id)
        id = 0
        data = {}
        for menu in menus:
            data[id] = {"id": menu.id, "name": menu.dish.name}
            id += 1
    return JsonResponse(data)


#@require_http_methods(['GET'])
#def serve_dishes(request):
#    restaurant_id=request.user.restaurant.id
#    if(request.GET.get('menuID',None) is not None):
#        dishes = Dish.objects.filter(restaurant_id=restaurant_id)
#        dish = get_object_or_404(dishes, id=request.GET['dishID'])
#        data =  {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url, "serve": dish.serve}
#    else:
#        dishes = Dish.objects.filter(restaurant_id=restaurant_id, serve = 1)
#        id = 0
#        data = {}
#        for dish in dishes:
#            data[id] = {"id": dish.id, "name": dish.name}
#            id += 1
#    return JsonResponse(data)

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
    serve = request.POST['serve']
    dish = None
    if(dish_id is not None):
        print('Went to if')
        dishes = Dish.objects.filter(restaurant_id=restaurant) #restaurant_id?
        dish = get_object_or_404(dishes, id=dish_id)
        dish.name = name
        dish.cook_time = cook_time
        dish.fresh_time = fresh_time
        dish.image = image
        dish.serve = serve
        dish.save()
    else: #brand new dish
        print('Went to else')
        if validate_dish_input(name, cook_time, fresh_time):
            dish = create_dish(name, cook_time, fresh_time, image, restaurant_id, serve) #restaurant_id?
            dish.name = name
            dish.cook_time = cook_time
            dish.fresh_time = fresh_time
            dish.save()
    if (int(serve) == 1):
        menu = create_menu(restaurant_id = restaurant_id, dish_id = dish.id, user_id = request.user.id)
    else:
        menu = Menu.objects.filter(restaurant_id = restaurant_id, dish_id = dish.id)
        menu.delete()
    if (image): 
        data =  {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "foodImageUrl": dish.image.url, "serve":dish.serve}
    else:
        data =  {"id": dish.id, "name": dish.name, "cookTime": dish.cook_time, "freshTime": dish.fresh_time, "serve":dish.serve}
    return HttpResponse(data)

@require_http_methods(['GET'])
def employee_delete(request):
    restaurant_id=request.user.restaurant.id
    employee_id=request.GET['employeeID']
    print(employee_id)
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
    data = {'status': restaurant.open_status}         
    return JsonResponse(data)