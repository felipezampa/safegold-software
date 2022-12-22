from django.urls import path
from api import views

app_name = 'api'

urlpatterns = [
    path('empresas/',views.empresa_list_api,name='empresa-api'),
    path('empresas/<int:pk>/',views.empresa_detail_api,name='empresa-detail-api'),
    path('projetos/', views.projetos_list_api, name='projetos-api'),
    path('user/', views.user_list_api, name='user-api'),
    path('user/<int:pk>/', views.user_detail_api, name='user-detail-api'),

    


]

