from django.urls import path
from crud_app import views

app_name = 'crud_app'

urlpatterns = [
    path('',views.ContaListView.as_view(),name='list'),
    path('create/',views.ContaCreateView.as_view(),name='create'),
    path('update/<int:pk>/',views.ContaUpdateView.as_view(),name='update'),
    path('delete/<int:pk>/',views.ContaDeleteView.as_view(),name='delete'),
    path('detail/<int:pk>/',views.ContaDetailView.as_view(),name='detail'),
    path('empresas/',views.EmpresaListView.as_view(),name='list'),
    # path('projetos/',views.ProjetoListView.as_view(),name='list'),
    # path('create/projetos',views.ContaCreateView.as_view(),name='create'),
    # path('update/projetos/<int:pk>/',views.ContaUpdateView.as_view(),name='update'),
    # path('delete/projetos/<int:pk>/',views.ContaDeleteView.as_view(),name='delete'),
    # path('detail/projetos/<int:pk>/',views.ContaDetailView.as_view(),name='detail'),
    # path('', v.expense_list, name='expense_list'),
    # path('json/', v.expense_json, name='expense_json'),
    # path('client/', v.expense_client, name='expense_client'),
    # path('create/', v.expense_create, name='expense_create'),
    # path('<int:pk>/delete/', v.expense_delete, name='expense_delete'),
    # path('<int:pk>/', v.expense_detail, name='expense_detail'),
    # path('<int:pk>/update/', v.expense_update, name='expense_update'),
]

