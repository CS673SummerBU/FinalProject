from ..models import User, Restaurant
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
    restaurant.save()
    return restaurant.id