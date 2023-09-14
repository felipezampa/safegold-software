"""sg_software URL Configuration

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
from app.shared.views import *
from app.financeiro.views import *
from app.agenda.views import *
from app.auth.views import *

from rest_framework import routers

router = routers.DefaultRouter()
# SHARED
router.register('sha_empresas', EmpresasViewSet, basename= 'Empresas')
router.register('sha_projetos', ProjetosViewSet, basename= 'Projetos')
router.register('sha_user', UserViewSet, basename= 'User')
router.register('sha_projeto_user', ProjetoUserViewSet, basename= 'projeto_user')

# FINANCEIRO
router.register('fin_grupo_contas',GrupoContasViewSet, basename='fin_grupo_contas')
router.register('fin_subgrupo_contas',SubgrupoContasViewSet, basename='fin_subgrupo_contas')
router.register('fin_conta_analitica',ContaAnaliticaViewSet, basename='fin_conta_analitica')
router.register('fin_fornecedor',FornecedorViewset, basename='fornecedor')
router.register('fin_matriz_analitica',MatrizAnaliticaFornecedorViewSet, basename='matriz_analitica_fornecedor')

# AVALIAÇÃO DE DESEMPENHO, MODULO RH
router.register('auth_user_permission', AuthUserPermissionsViewSet, basename='auth_user_permission') #refazer isso aqui

# AGENDA
router.register('ag_funcao_gestor', SgFuncaoGestorViewSet, basename='sg_funcao_gestor')
router.register('ag_agenda', AgFactAgendaViewSet, basename='ag_agenda')
router.register('ag_tipo', AgTipoViewSet, basename='ag_tipo')
 

urlpatterns = [
    path('',IndexView.as_view(),name='index'),
    path('admin/',admin.site.urls,name='admin'),
    #rest
    path('api/auth/', include('rest_framework.urls')),
    path('api/',include(router.urls)),
    path('api/login/', api_login, name='login'),
    path('api/userlogado/', api_userlogin, name='user_logged'),
]
