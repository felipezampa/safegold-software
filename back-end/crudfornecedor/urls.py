"""crudfornecedor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import (
    EmpresaserializerViewSet,
    ProjetosViewSet,
    UserViewSet,
    MyObtainTokenPairView
)

from rest_framework import routers

from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,

)
router = routers.DefaultRouter()
router.register('empresas', EmpresaserializerViewSet, basename= 'Empresas')
# router.register('matrizContaFornecedor', views.MatrizContaFornecedorViewSet, basename= 'MatrizContaFornecedor')
router.register('projetos', ProjetosViewSet, basename= 'Projetos')
# router.register('dimcontas', views.DimcontasViewSet, basename= 'Dimcontas')
router.register('user', UserViewSet, basename= 'User')



from crud_app import views


urlpatterns = [
    path('index/',views.IndexView.as_view(),name='index'),
    path('admin/',admin.site.urls,name='admin'),
    path('app/',include('crud_app.urls',namespace='crud_app')),
    path('', include('usuarios.urls')),
    path('api/',include(router.urls)),
    path('token/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]
