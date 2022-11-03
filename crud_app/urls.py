from django.urls import path
from crud_app import views

app_name = 'crud_app'

urlpatterns = [

    ###############################     EMPRESA     ###############################
    path('empresas/',views.EmpresaListView.as_view(),name='empresa-list'),
    path('empresas/create/',views.EmpresaCreateView.as_view(),name='empresa-create'),
    path('empresas/update/<int:pk>/',views.EmpresaUpdateView.as_view(),name='empresa-update'),
    path('empresas/delete/<int:pk>/',views.EmpresaDeleteView.as_view(),name='empresa-delete'),
    path('empresas/detail/<int:pk>/',views.EmpresaDetailView.as_view(),name='empresa-detail'),

    ###############################     PROJETO     ###############################
    # path('projeto/',views.ProjetoListView.as_view(),name='list'),
    # path('projeto/create/',views.ProjetoCreateView.as_view(),name='create'),
    # path('projeto/update/<int:pk>/',views.EmpresaUpdateView.as_view(),name='update'),
    # path('projeto/delete/<int:pk>/',views.ProjetoDeleteView.as_view(),name='delete'),
    # path('projeto/detail/<int:pk>/',views.ProjetoDetailView.as_view(),name='detail'),
    
    ###############################    DIMCONTAS    ###############################
    path('conta/',views.DimContasListView.as_view(),name='contas-list'),
    path('conta/create/',views.DimContasCreateView.as_view(),name='contas-create'),
    path('conta/update/<int:pk>/',views.DimContasUpdateView.as_view(),name='contas-update'),
    path('conta/delete/<int:pk>/',views.DimContasDeleteView.as_view(),name='contas-delete'),
    path('conta/detail/<int:pk>/',views.DimContasDetailView.as_view(),name='contas-detail'),

    ############################### CONTAFORNECEDOR ###############################
    path('matrizfornecedorconta/',views.MatrizFornecedorListView.as_view(),name='matriz-list'),
    # path('matrizfornecedorconta/create/',views.MatrizFornecedorCreateView.as_view(),name='matriz-create'),
    # path('matrizfornecedorconta/update/<int:pk>/',views.MatrizFornecedorUpdateView.as_view(),name='matriz-update'),
    path('matrizfornecedorconta/delete/<int:pk>/',views.MatrizFornecedorDeleteView.as_view(),name='matriz-delete'),
    path('matrizfornecedorconta/detail/<int:pk>/',views.MatrizFornecedorDetailView.as_view(),name='matriz-detail'),

]

