from ..models import User, Restaurant, Dish, Menu
from django.db import transaction


def create_user(username, password, role):
    try:
        with transaction.atomic():
            res_id = create_restaurant()
            user = User(username=username, is_superuser=False, is_active=True, is_staff=False, role_id=role, restaurant_id = res_id )
            user.set_password(password)
            user.save()
        return user
    except: 
        print('error')

def create_restaurant():
    restaurant = Restaurant()
    create_menu(restaurant_id)
    restaurant.save()
    return restaurant.id

def create_dish(name, cook_time, fresh_time, image, res_id, serve):
    dish = Dish(name = name, cook_time = cook_time, fresh_time = fresh_time, image = image, restaurant = res_id, serve = serve)
    dish.save()
    return dish

def create_menu():
    menu = Menu()
    menu.save()
    return menu