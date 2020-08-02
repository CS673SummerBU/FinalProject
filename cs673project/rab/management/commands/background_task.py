from django.core.management.base import BaseCommand, CommandError
from  rab.models import User, Menu, Status
import time
from django.utils import timezone

class Command(BaseCommand):
    rab_user = User.objects.get(username = "rab_admin") #rab user
    rab_user_id = rab_user.id #rab user

    def add_arguments(self, parser):
        parser.add_argument('timeout', type=int, default = 10) 
        parser.add_argument('refresh', type=int, default = 5)

    def handle(self, **options):
        timeout = options['timeout']
        refresh = options['refresh']
        
        time_end = time.time() + 60 * timeout #run for 1 hour

        while time.time() <= time_end:
            menu_items = Menu.objects.filter(restaurant__open_status = 1).exclude(status_id = 3)
  
            if(len(menu_items) > 0):
                for menu_item in menu_items:
                    if(menu_item.status.id == 1):
                        self._update_dish_status(menu_item, 2)
                    
                    elif(menu_item.status.id == 4 and self._compare_time(menu_item.last_served, menu_item.dish.fresh_time)):
                       self. _update_dish_status(menu_item,2)

                    elif(menu_item.status.id == 2 and self._compare_time(menu_item.last_updated, menu_item.dish.cook_time)):
                       self. _update_dish_status(menu_item,3)
            time.sleep(refresh)
        
    def _update_dish_status(self,menu_item, new_status):
        old_status = menu_item.status.id
        menu_item.status_id=new_status
        menu_item.user_id = self.rab_user_id
        menu_item.last_updated = timezone.now()
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
