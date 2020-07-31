from ..models import User, Restaurant, Dish, Menu
from django.db import transaction


def create_user(username, password, role, res_id=None):
    try:
        with transaction.atomic():
            if(role == 1):
                res_id = create_restaurant()  #might need to prevent creating a new restaurant/menu if you create a new manager from the manager_employee page
            user = User(username=username, is_superuser=False, is_active=True, is_staff=False, role_id=role, restaurant_id = res_id )
            user.set_password(password)
            user.save()
        return user
    except: 
        print('error')

def create_restaurant():
    restaurant = Restaurant.objects.create()
    restaurant.save()
    #create_menu(restaurant)
    return restaurant.id

def create_dish(name, cook_time, fresh_time, image, res_id, serve):
    dish = Dish(name = name, cook_time = cook_time, fresh_time = fresh_time, image = image, restaurant_id = res_id, serve = serve)
    dish.save()
    return dish

def create_menu(restaurant_id, dish_id):
    menu = Menu(restaurant_id = restaurant_id, dish_id = dish_id)
    menu.save()
    return menu