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
    ProjetoUserViewSet,
    FinGrupoContasViewSet,
    FinSubgrupoContasViewSet,
    FinContaAnaliticaViewSet,
    MatrizAnaliticaFornecedorViewSet,
    FornecedorViewset,
    LoginView,UserView
)
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework import routers

router = routers.DefaultRouter()
router.register('empresas', EmpresaserializerViewSet, basename= 'Empresas')
# router.register('matrizContaFornecedor', views.MatrizContaFornecedorViewSet, basename= 'MatrizContaFornecedor')
router.register('projetos', ProjetosViewSet, basename= 'Projetos')
# router.register('dimcontas', views.DimcontasViewSet, basename= 'Dimcontas')
router.register('user', UserViewSet, basename= 'User')
router.register('projeto_user', ProjetoUserViewSet, basename= 'projeto_user')
router.register('fin_grupo_contas',FinGrupoContasViewSet, basename='fin_grupo_contas')
router.register('fin_subgrupo_contas',FinSubgrupoContasViewSet, basename='fin_subgrupo_contas')
router.register('fin_conta_analitica',FinContaAnaliticaViewSet, basename='fin_conta_analitica')
router.register('fornecedor',FornecedorViewset, basename='fornecedor')

router.register('matriz_analitica_fornecedor',MatrizAnaliticaFornecedorViewSet, basename='matriz_analitica_fornecedor')




from crud_app import views


urlpatterns = [
    path('index/',views.IndexView.as_view(),name='index'),
    path('admin/',admin.site.urls,name='admin'),
    path('app/',include('crud_app.urls',namespace='crud_app')),
    path('home/', include('usuarios.urls')),





    #rest
    path('api/auth/', include('rest_framework.urls')),
    path('accounts/', include('accounts.urls')),
    path('api/',include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/userlogged/', UserView.as_view(), name='userview'),
]
