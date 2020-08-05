from django.core.management.base import BaseCommand, CommandError
from  rab.models import User, Menu, Status
import time
from django.utils import timezone
from ...utils import constants

class Command(BaseCommand):
    help = 'Automates the transiton of a Dish not served/freshnes expired to Ordered/Cooking and optionally Ordered/Cooking to Ready to Serve'
    rab_user = User.objects.get(username = "rab_admin") #rab user
    rab_user_id = rab_user.id #rab user

    def add_arguments(self, parser):
        parser.add_argument('--timeout', type=int, nargs='?', default = 60, help="Set the service timeout (in minutes)"), #run for 1 hour
        parser.add_argument('--refresh', type=int, nargs='?', default = 5, help="How often the service checks the status of dishes (in seconds)")
        parser.add_argument('--runCookTask', action='store_true', help="Sets the Dish 'Ready to Serve' after the cook time is elapsed." )

    def handle(self, **options):
        timeout = options['timeout']
        refresh = options['refresh']
        cook_task = options['runCookTask']
        
        time_end = time.time() + 60 * timeout 

        while time.time() <= time_end:

            menu_items = Menu.objects.filter(restaurant__open_status = True).exclude(status_id = (constants.STATUS_READY if cook_task else  (constants.STATUS_ORDER_PLACED, constants.STATUS_READY)))

            if(len(menu_items) > 0):
                for menu_item in menu_items:
                    if(menu_item.status.id == constants.STATUS_NO_ORDER_PLACED):
                        self._update_dish_status(menu_item, constants.STATUS_ORDER_PLACED)
                    
                    elif(menu_item.status.id == constants.STATUS_SERVING and self._compare_time(menu_item.last_served, menu_item.dish.fresh_time)):
                       self. _update_dish_status(menu_item,constants.STATUS_ORDER_PLACED)

                    elif(menu_item.status.id == constants.STATUS_ORDER_PLACED and self._compare_time(menu_item.last_updated, menu_item.dish.cook_time)):
                       self. _update_dish_status(menu_item,constants.STATUS_READY)
            time.sleep(refresh)
        
    def _update_dish_status(self,menu_item, new_status):
        old_status = menu_item.status.id
        menu_item.status_id=new_status
        menu_item.user_id = self.rab_user_id
        try:
            if (Menu.objects.get(id=menu_item.id).status.id == old_status): #checking whether menu object changed outside of process
                menu_item.save()
                print(f"Moved Menu ID: {menu_item.id}, {menu_item.dish.name} to '{menu_item.status.name}'")
        except Exception as ex:
                print(f"Failed to update Menu ID: {menu_item.id}")
                print(ex)

    def _compare_time(self, start_time, elapse_limit):
        datetime_diff = timezone.localtime(timezone.now()) - start_time
        if(datetime_diff.seconds >= (elapse_limit * 60)):
            return True
        return False
