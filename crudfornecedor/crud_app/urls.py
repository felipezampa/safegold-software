from django.urls import path
from .views import *

app_name = 'crud_app'

urlpatterns = [
    # modelo do path --> path('endereço da pag',MinhaView.as_view(),name=nomedaview)
    # path('',HomePageView.as_view(),name='index'),
]