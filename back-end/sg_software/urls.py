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
router.register('empresas', EmpresasViewSet, basename= 'Empresas')
router.register('projetos', ProjetosViewSet, basename= 'Projetos')
router.register('user', UserViewSet, basename= 'User')
router.register('projeto_user', ProjetoUserViewSet, basename= 'projeto_user')

# FINANCEIRO
router.register('fin_grupo_contas',GrupoContasViewSet, basename='fin_grupo_contas')
router.register('fin_subgrupo_contas',SubgrupoContasViewSet, basename='fin_subgrupo_contas')
router.register('fin_conta_analitica',ContaAnaliticaViewSet, basename='fin_conta_analitica')
router.register('fornecedor',FornecedorViewset, basename='fornecedor')
router.register('matriz_analitica_fornecedor',MatrizAnaliticaFornecedorViewSet, basename='matriz_analitica_fornecedor')

# AVALIAÇÃO DE DESEMPENHO, MODULO RH
router.register('auth_user_permission', AuthUserPermissionsViewSet, basename='auth_user_permission')
# router.register('rh_cargos', RHCargoViewSet, basename='rh_cargos')
# router.register('rh_classificacao_comportamental', RhClassificacaoCompViewSet, basename='rh_classificacao_comportamental')
# router.register('rh_cargo_metas', RhFactCargoMetasViewSet, basename='rh_cargo_metas')
# router.register('rh_indicador_competencia', RhFactComportamentalViewSet, basename='rh_factcomportamental')
# router.register('rh_mapeamento_cargo_competencias',RhMapCargoCompViewSet , basename='rh_mapeamento_cargo_competencias')
# router.register('rh_user_avaliacao',RhUserAvaliacaoViewSet , basename='rh_user_avaliacao')
# router.register('rh_apro_gestor',AptoGestorViewSet , basename='rh_apro_gestor')

# AGENDA
# router.register('sg_unidadedenegocios', SgUnidadeNegocioViewSet, basename='sg_unidadedenegocios')
# router.register('sg_area', SgAreaViewSet, basename='sg_area')
# router.register('sg_funcao', SgFuncaoViewSet, basename='sg_funcao')
# router.register('sg_funcao_gestor', SgFuncaoGestorViewSet, basename='sg_funcao_gestor')
# router.register('ag_agenda', AgFactAgendaViewSet, basename='ag_agenda')
router.register('ag_tipo', AgTipoViewSet, basename='ag_tipo')
# router.register('ag_semana_atual', CurrentWeekAgendaViewSet, basename='ag_semana_atual')
# router.register('ag_semana_passada', LastWeekAgendaViewSet, basename='ag_semana_passada')
# router.register('ag_semana_proxima', NextWeekAgendaViewSet, basename='ag_semana_proxima')




from app.shared import views
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage


urlpatterns = [
    path('',views.IndexView.as_view(),name='index'),
    path('admin/',admin.site.urls,name='admin'),
    # path('app/',include('app.shared.urls',namespace='shared')),
    # path('home/', include('usuarios.urls')),

    #rest
    path('api/auth/', include('rest_framework.urls')),
    # path('accounts/', include('accounts.urls')),
    path('api/',include(router.urls)),
    path('api/login/', api_login, name='login'),
    path('api/userlogado/', api_userlogin, name='user_logged'),
]
