from ..models import User, Restaurant, Dish, Menu
from django.db import transaction
import traceback

def create_user(username, password, role, res_id=None):
    try:
        with transaction.atomic():
            if(role == 1 and res_id == None): #if another manager created. Stop from creating new restaurant
                res_id = create_restaurant() 
            user = User(username=username, is_superuser=False, is_active=True, is_staff=False, role_id=role, restaurant_id = res_id )
            user.set_password(password)
            user.save()
        return user
    except Exception as ex:
        traceback.print_exception(type(ex), ex, ex.__traceback__)

def create_restaurant():
    restaurant = Restaurant.objects.create()
    restaurant.save()
    #create_menu(restaurant)
    return restaurant.id

def create_dish(name, cook_time, fresh_time, image, res_id, serve):
    dish = Dish(name = name, cook_time = cook_time, fresh_time = fresh_time, image = image, restaurant_id = res_id, serve = serve)
    dish.save()
    return dish

def create_menu(restaurant_id, dish_id, user_id):
    menu = Menu(restaurant_id = restaurant_id, dish_id = dish_id, user_id = user_id)
    menu.save()
    return menu