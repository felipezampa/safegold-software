from django.urls import path
from crud_app import views

app_name = 'crud_app'

urlpatterns = [
    #path('',index,name='index'),
    #path('',read_planodecontas,name='read_planodecontas')
    #path('new',create_planodecontas,name='create_planodecontas')
    #path('update/<int:id>',update_planodecontas,name='update_planodecontas')
    #path('delete/<int:id>',delete_planodecontas,name='delete_planodecontas')

    path('',views.ContaListView.as_view(),name='list'),
    #path('<int:pk>/',views.SchoolDetailView.as_view(),name='detail'),
    path('create/',views.ContaCreateView.as_view(),name='create'),
    #path('update/<int:pk>/',views.SchoolUpdateView.as_view(),name='update'),
    #path('delete/<int:pk>/',views.SchoolDeleteView.as_view(),name='delete')
]