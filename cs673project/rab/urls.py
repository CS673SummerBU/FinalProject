from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign_up', views.sign_up, name='sign_up'),
    path('login_user', views.login_user, name='login_user'),
    path('manager', views.manager, name='manager'),
    path('manager_personal', views.manager_personal, name='manager_personal'),
    path('manager_restaurant', views.manager_restaurant, name='manager_restaurant'),
    path('manager_menu', views.manager_menu, name='manager_menu'),
    path('manager_menu_detail', views.manager_menu_detail, name='manager_menu_detail'),
    path('manager_status', views.manager_status, name='manager_status'),
    path('manager_status_detail', views.manager_status_detail, name='manager_status_detail'),
    path('manager_employee', views.manager_employee, name='manager_employee'),
    path('manager_employee_detail', views.manager_employee_detail, name='manager_employee_detail'),
    path('manager_personal_update', views.manager_personal_update, name='manager_personal_update'),
    path('manager_restaurant_update', views.manager_restaurant_update, name='manager_restaurant_update'),
    path('employees', views.employees, name='employees'),
    path('employee_update', views.employee_update, name='employee_update'),
    path('employee_delete', views.employee_delete, name='employee_delete'),
    path('dishes', views.dishes, name='dishes'),
    path('dish_update', views.dish_update, name='dish_update'),
    path('dish_delete', views.dish_delete, name='dish_delete'),
]
