from crud_app import models
from rest_framework import viewsets, generics
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
import jwt
import base64
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from datetime import datetime, timedelta, date
from rest_framework.authentication import TokenAuthentication

'''
    @eduardolcordeiro

    Construção do ViewSet da api

        - queryset = Faz a busca no banco de dados, semelhante a um 'SELECT * FROM xtable'
        - serializer_class = recebe o serializes do serializer.py
        - filter_backends = Implementação de filtros do DRF
        - filterset_fields = Recebe uma lista dos campos que serão filtrados
        - search_fields = Recebe uma lista dos campos que serão filtrados no campo de search

'''
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class EmpresaserializerViewSet(viewsets.ModelViewSet):

    queryset = models.Empresas.objects.all()
    serializer_class = serializers.EmpresasSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['cod_empresa','empresa', 'cnpj', 'cod_projeto','cod_projeto__id_user']
    search_fields = ['cod_empresa', 'empresa', 'cnpj','cod_projeto']
    # permission_classes = [IsAuthenticated]


    
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ProjetosViewSet(viewsets.ModelViewSet):

    queryset = models.Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['projeto', 'cod_projeto','id_user']
    search_fields = ['projeto', 'cod_projeto', 'id_user']
    # permission_classes = [IsAuthenticated]





class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']
    # permission_classes = [IsAuthenticated]



class ProjetoUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.ProjetoUser.objects.all()
    serializer_class = serializers.ProjetoUserSerializer

class FinGrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.FinGrupoContas.objects.all()
    serializer_class = serializers.FinGrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_grupo_contas','desc_grupo_contas', 'permite_vinculo', 'sumario']

class FinSubgrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.FinSubgrupoContas.objects.all()
    serializer_class = serializers.FinSubgrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_subgrupo_contas', 'desc_subgrupo_contas', 'cod_grupo_contas']

class FinContaAnaliticaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.FinContaAnalitica.objects.all()
    serializer_class = serializers.FinContaAnaliticaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_empresa', 'cod_conta_analitica', 'desc_conta','cod_subgrupo_contas']

class FornecedorViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.Fornecedor.objects.all()
    serializer_class = serializers.FornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_fornecedor', 'cod_empresa', 'cnpj', 'empresa', 'insc_est', 'matriz', 'fornecedor']



class MatrizAnaliticaFornecedorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.MatrizAnaliticaFornecedor.objects.all()
    serializer_class = serializers.MatrizAnaliticaFornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_matriz_analitica_fornecedor', 'cod_empresa', 'vinculo', 'cod_conta_analitica', 'cod_fornecedor']
    


'''
    @eduardolcordeiro

    Autenticação JWT (JSON Web Token)
        - JWT é usado para criar tokens de acesso a um app
        - O servidor gera um token que certifica a identidade do usuário e o envia ao cliente

        Instale o pacote do django-rest-framework-simplejwt:

          '  pip instalar djangorestframework-simplejwt  '

        
        adicione ao settings.py 
        
            REST_FRAMEWORK = {
                'DEFAULT_AUTHENTICATION_CLASSES': [
                    'rest_framework_simplejwt.authentication.JWTAuthentication',
                ],
            }
        


    referencia = https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8


'''



# AVALIAÇÃO DE DESEMPENHO, MODULO RH


class AuthUserPermissionsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.AuthUserPermissions.objects.all()
    serializer_class = serializers.AuthUserPermissionsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','id_user', 'financeiro','avaliacao', 'is_head']
    


class RhClassificacaoCompViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.RhClassificacaoComp.objects.all()
    serializer_class = serializers.RhClassificacaoCompSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'classificacao']

# class RhFactCargoMetasViewSet(viewsets.ModelViewSet):
#     queryset = models.RhFactCargoMetas.objects.all()
#     serializer_class = serializers.RhFactCargoMetasSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id', 'idrh_cargo','idrh_cargo__nome_cargo','idrh_fact_comportamental', 'idrh_fact_comportamental__indicador','idrh_fact_comportamental__competencia','idrh_classificacao_comp','idrh_classificacao_comp__classificacao','valor_ncf','qtde_indicadores','peso_indicadores']

# class RhFactComportamentalViewSet(viewsets.ModelViewSet):
#     queryset = models.RhFactComportamental.objects.all()
#     serializer_class = serializers.RhFactComportamentalSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id', 'indicador', 'competencia']

# class RhMapCargoCompViewSet(viewsets.ModelViewSet):
#     queryset = models.RhMapCargoComp.objects.all()
#     serializer_class = serializers.RhMapCargoCompSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id', 'idrh_cargo','idrh_cargo__nome_cargo','idrh_fact_comportamental', 'idrh_fact_comportamental__indicador','idrh_fact_comportamental__competencia','idrh_classificacao_comp','idrh_classificacao_comp__classificacao','instrucoes']

# class RhUserAvaliacaoViewSet(viewsets.ModelViewSet):
#     queryset = models.RhUserAvaliacao.objects.all()
#     serializer_class = serializers.RhUserAvaliacaoSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = []

# class AptoGestorViewSet(viewsets.ModelViewSet):
#     queryset = models.AptoProj.objects.all()
#     serializer_class = serializers.Apto_gestorSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = []




@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key})
    else:
        return JsonResponse({'error': 'Invalid credentials'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_userlogin(request):
    user = request.user
    try:
            auth = models.AuthUserPermissions.objects.get(id_user=user.pk)

            financeiro = auth.financeiro
            avaliacao = auth.avaliacao
            head_de_area = auth.is_head


    except models.AuthUserPermissions.DoesNotExist:
            # Se o objeto AuthUserPermissions não existir, define todas as variáveis ​​como zero ou "Sem cargo vinculado"
            financeiro = avaliacao = head_de_area = 0

    serialized_user = {
        'id_user': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'financeiro': financeiro,
        'avaliacao': avaliacao,
        'head_de_area': head_de_area,
        'superuser': user.is_superuser,
        'token': request.auth.key
    }
    return JsonResponse(serialized_user)

################################################################################## MODULO AGENDA ###########################################################################################################################
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SgUnidadeNegocioViewSet(viewsets.ModelViewSet):
    queryset = models.SgUnidadeNegocio.objects.all()
    serializer_class = serializers.SgUnidadedeNegocioSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_unidade','unidade']

class SgAreaViewSet(viewsets.ModelViewSet):

    queryset = models.SgArea.objects.all()

    serializer_class = serializers.SgAreaSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_area','id_unidade', 'area']

class SgFuncaoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.SgFuncao.objects.all()
    serializer_class = serializers.SgFuncaoSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_funcao','id_area','funcao','carga_horaria']

class SgFuncaoGestorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = models.SgFuncaoGestor.objects.all()
    serializer_class = serializers.SgFuncaoGestorSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_func_gest','id_funcao','id_user', 'data_inicio','data_fim']

class AgTipoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = models.AgTipo.objects.all()
    serializer_class = serializers.AgTipoSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_tipo','tipo']
    
class AgFactAgendaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.AgFactAgendaSerializer
    queryset = models.AgFactAgenda.objects.all()

    def list(self, request):
        year_start, year_end = self.get_year_range(date.today().year)
        agendas_ano = models.AgFactAgenda.objects.filter(data__range=[year_start, year_end])
        serializer = serializers.AgFactAgendaSerializer(agendas_ano, many=True)
        return Response(serializer.data)

    def get_year_range(self, year):
        start = date(year, 1, 1)
        end = date(year, 12, 31)
        return start, end


class CurrentWeekAgendaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.AgFactAgendaSerializer
    queryset = models.AgFactAgenda.objects.all()

    def list(self, request):
        week_start, week_end = self.get_week_range(date.today())
        agendas_semana = models.AgFactAgenda.objects.filter(data__range=[week_start, week_end])
        serializer = serializers.AgFactAgendaSerializer(agendas_semana, many=True)
        return Response(serializer.data)

    def get_week_range(self, date_obj):
        start = date_obj - timedelta(days=date_obj.weekday())
        end = start + timedelta(days=6)
        return start, end

class LastWeekAgendaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.AgFactAgendaSerializer
    queryset = models.AgFactAgenda.objects.all()

    def list(self, request):
        week_start, week_end = self.get_week_range(date.today() - timedelta(weeks=1))
        agendas_semana = models.AgFactAgenda.objects.filter(data__range=[week_start, week_end])
        serializer = serializers.AgFactAgendaSerializer(agendas_semana, many=True)
        return Response(serializer.data)

    def get_week_range(self, date_obj):
        start = date_obj - timedelta(days=date_obj.weekday())
        end = start + timedelta(days=6)
        return start, end

class NextWeekAgendaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.AgFactAgendaSerializer
    queryset = models.AgFactAgenda.objects.all()

    def list(self, request):
        week_start, week_end = self.get_week_range(date.today() + timedelta(weeks=1))
        agendas_semana = models.AgFactAgenda.objects.filter(data__range=[week_start, week_end])
        serializer = serializers.AgFactAgendaSerializer(agendas_semana, many=True)
        return Response(serializer.data)

    def get_week_range(self, date_obj):
        start = date_obj - timedelta(days=date_obj.weekday())
        end = start + timedelta(days=6)
        return start, end