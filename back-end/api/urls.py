from django.urls import path
from api import views

app_name = 'api'

urlpatterns = [
    path('empresas/',views.empresa_list_api,name='empresa-api'),
    path('projetos/', views.projetos_list_api, name='projetos-api'),
    path('user/', views.users_list_api, name='user-api')
    
 

]

