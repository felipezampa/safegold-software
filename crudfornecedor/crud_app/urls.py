from django.urls import path
from crud_app import views

app_name = 'crud_app'

urlpatterns = [
    path('',views.ContaListView.as_view(),name='list'),
    path('create/',views.ContaCreateView.as_view(),name='create'),
    path('update/<int:pk>/',views.ContaUpdateView.as_view(),name='update'),
    path('delete/<int:pk>/',views.ContaDeleteView.as_view(),name='delete'),
    path('detail/<int:pk>/',views.ContaDetailView.as_view(),name='detail'),
]

