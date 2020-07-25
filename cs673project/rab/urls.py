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
    path('manager_status', views.manager_status, name='manager_status'),
    path('manager_employee', views.manager_employee, name='manager_employee'),
    path('manager_personal_update', views.manager_personal_update, name='manager_personal_update'),
]
