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
from api.views import *
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework import routers

router = routers.DefaultRouter()
# EMPRESA E CONTEXTO
router.register('empresas', EmpresaserializerViewSet, basename= 'Empresas')
router.register('projetos', ProjetosViewSet, basename= 'Projetos')
router.register('user', UserViewSet, basename= 'User')
router.register('projeto_user', ProjetoUserViewSet, basename= 'projeto_user')

# PLANO DE CONTAS
router.register('fin_grupo_contas',FinGrupoContasViewSet, basename='fin_grupo_contas')
router.register('fin_subgrupo_contas',FinSubgrupoContasViewSet, basename='fin_subgrupo_contas')
router.register('fin_conta_analitica',FinContaAnaliticaViewSet, basename='fin_conta_analitica')

# FORNECEDOR
router.register('fornecedor',FornecedorViewset, basename='fornecedor')
router.register('matriz_analitica_fornecedor',MatrizAnaliticaFornecedorViewSet, basename='matriz_analitica_fornecedor')

# AVALIAÇÃO DE DESEMPENHO, MODULO RH
router.register('auth_user_permission', AuthUserPermissionsViewSet, basename='auth_user_permission')
# router.register('rh_cargos', RHCargoViewSet, basename='rh_cargos')
router.register('rh_classificacao_comportamental', RhClassificacaoCompViewSet, basename='rh_classificacao_comportamental')
# router.register('rh_cargo_metas', RhFactCargoMetasViewSet, basename='rh_cargo_metas')
# router.register('rh_indicador_competencia', RhFactComportamentalViewSet, basename='rh_factcomportamental')
# router.register('rh_mapeamento_cargo_competencias',RhMapCargoCompViewSet , basename='rh_mapeamento_cargo_competencias')
# router.register('rh_user_avaliacao',RhUserAvaliacaoViewSet , basename='rh_user_avaliacao')
# router.register('rh_apro_gestor',AptoGestorViewSet , basename='rh_apro_gestor')


# AGENDA
router.register('sg_unidadedenegocios', SgUnidadeNegocioViewSet, basename='sg_unidadedenegocios')
router.register('sg_area', SgAreaViewSet, basename='sg_area')
router.register('sg_funcao', SgFuncaoViewSet, basename='sg_funcao')
router.register('sg_funcao_gestor', SgFuncaoGestorViewSet, basename='sg_funcao_gestor')
router.register('ag_agenda', AgFactAgendaViewSet, basename='ag_agenda')
router.register('ag_tipo', AgTipoViewSet, basename='ag_tipo')
router.register('ag_semana_atual', CurrentWeekAgendaViewSet, basename='ag_semana_atual')
router.register('ag_semana_passada', LastWeekAgendaViewSet, basename='ag_semana_passada')
router.register('ag_semana_proxima', NextWeekAgendaViewSet, basename='ag_semana_proxima')




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
    #path('api/login/', LoginView.as_view(), name='login'),
    #path('api/userlogged/', UserView.as_view(), name='userview'),
    #path('api/logout/', Logout.as_view(), name='logout'),
    # path('api/login/', login),
    # path('api/userlogged/', user),
    # path('api/logout/', logout),
    path('api/login/', api_login, name='login'),
    path('api/userlogado/', api_userlogin, name='user_logged'),
    #path('api/logout/', logout),

    # # path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # # path('api/profile/', ProfileView.as_view(), name='profile'),
    ]
