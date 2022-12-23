from django.urls import path
from api import views

app_name = 'api'

urlpatterns = [
    # EMPRESAS API URL
    path('empresas/',views.empresa_list_api,name='empresa-api'),
    path('empresas/<int:pk>/',views.empresa_detail_api,name='empresa-detail-api'),
    # PROJETOS API URL
    path('projetos/', views.projeto_list_api, name='projetos-api'),
    path('projetos/<int:pk>/', views.projeto_detail_api, name='projetos-detail-api'),
    # USER API URL
    path('user/', views.user_list_api, name='user-api'),
    path('user/<int:pk>/', views.user_detail_api, name='user-detail-api'),

    


]

