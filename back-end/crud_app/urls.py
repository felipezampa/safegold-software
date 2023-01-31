from django.urls import path
from crud_app import views

app_name = 'crud_app'

urlpatterns = [

    ###############################     EMPRESA     ###############################
    path('empresa/save',views.saveempresa,name='saveempresa'),
    path('empresa/add',views.insertempresa,name='insert'),
    path('empresa/update',views.update_all, name= 'update_all'),
    path('empresa/delete',views.delete_empresa,name='delete'),
    path('empresa/',views.ativos,name='empresa-list'),
    path('empresa/delete/<int:pk>/',views.EmpresaDeleteView_teste.as_view(),name='empresa-delete'),
    path('empresa/update/<int:pk>/',views.EmpresaUpdateView_teste.as_view(),name='empresa-update'),


    
    


]

