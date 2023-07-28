from app.shared import models as shared_models
from app.financeiro import models as financeiro_models
from app.avaliacao import models as avaliacao_models
from app.agenda import models as agenda_models
from rest_framework import viewsets, generics
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from datetime import datetime, timedelta, date
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter

'''
    @eduardolcordeiro

    Construção do ViewSet da api

        - queryset = Faz a busca no banco de dados, semelhante a um 'SELECT * FROM xtable'
        - serializer_class = recebe o serializes do serializer.py
        - filter_backends = Implementação de filtros do DRF
        - filterset_fields = Recebe uma lista dos campos que serão filtrados
        - search_fields = Recebe uma lista dos campos que serão filtrados no campo de search

'''
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
class EmpresasViewSet(viewsets.ModelViewSet):

    queryset = shared_models.Empresas.objects.all()
    serializer_class = serializers.EmpresasSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']  # Use 'projeto__id_user'
    search_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']
    # permission_classes = [IsAuthenticated]


# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
class ProjetosViewSet(viewsets.ModelViewSet):

    queryset = shared_models.Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['projeto', 'cod_projeto','id_user']
    # search_fields = ['projeto', 'cod_projeto', 'id_user']
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['projeto', 'cod_projeto', 'projetouser__id_user']  # Update the filterset_fields
    search_fields = ['projeto', 'cod_projeto', 'projetouser__id_user']  # Add search fields if needed
    # permission_classes = [IsAuthenticated]


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = shared_models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']
    # permission_classes = [IsAuthenticated]


# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
class ProjetoUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = shared_models.ProjetoUser.objects.all()
    serializer_class = serializers.ProjetoUserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['cod_projeto', 'id_user']  # Update the filterset_fields
    search_fields = ['cod_projeto__projeto']  # Add search fields if needed


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class FinGrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinGrupoContas.objects.all()
    serializer_class = serializers.FinGrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_grupo_contas','desc_grupo_contas', 'permite_vinculo', 'sumario']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class FinSubgrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinSubgrupoContas.objects.all()
    serializer_class = serializers.FinSubgrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_subgrupo_contas', 'desc_subgrupo_contas', 'cod_grupo_contas']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class FinContaAnaliticaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinContaAnalitica.objects.all()
    serializer_class = serializers.FinContaAnaliticaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_empresa', 'cod_conta_analitica', 'desc_conta','cod_subgrupo_contas']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class FornecedorViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.Fornecedor.objects.all()
    serializer_class = serializers.FornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_fornecedor', 'cod_empresa', 'cnpj', 'empresa', 'insc_est', 'matriz', 'fornecedor']


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class MatrizAnaliticaFornecedorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.MatrizAnaliticaFornecedor.objects.all()
    serializer_class = serializers.MatrizAnaliticaFornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_matriz_analitica_fornecedor', 'cod_empresa', 'vinculo', 'cod_conta_analitica', 'cod_fornecedor']
    
    @action(detail=True, methods=['patch'])
    def update_fields(self, request, pk=None):
        instance = self.get_object()

        instance.cod_conta_analitica = None
        instance.vinculo = 0

        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

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

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class AuthUserPermissionsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = avaliacao_models.AuthUserPermissions.objects.all()
    serializer_class = serializers.AuthUserPermissionsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','id_user', 'financeiro','avaliacao', 'is_head']
    

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# class RhClassificacaoCompViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     queryset = avaliacao_models.RhClassificacaoComp.objects.all()
#     serializer_class = serializers.RhClassificacaoCompSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id', 'classificacao']

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
            auth = avaliacao_models.AuthUserPermissions.objects.get(id_user=user.pk)

            financeiro = auth.financeiro
            avaliacao = auth.avaliacao
            head_de_area = auth.is_head


    except avaliacao_models.AuthUserPermissions.DoesNotExist:
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
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# class SgUnidadeNegocioViewSet(viewsets.ModelViewSet):
#     queryset = avaliacao_models.SgUnidadeNegocio.objects.all()
#     serializer_class = serializers.SgUnidadedeNegocioSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id_unidade','unidade']

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# class SgAreaViewSet(viewsets.ModelViewSet):

#     queryset = models.SgArea.objects.all()

#     serializer_class = serializers.SgAreaSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id_area','id_unidade', 'area']

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# class SgFuncaoViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     queryset = models.SgFuncao.objects.all()
#     serializer_class = serializers.SgFuncaoSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id_funcao','id_area','funcao','carga_horaria']

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# class SgFuncaoGestorViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     queryset = models.SgFuncaoGestor.objects.all()
#     serializer_class = serializers.SgFuncaoGestorSerializers
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['id_func_gest','id_funcao','id_user', 'data_inicio','data_fim']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class AgTipoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = agenda_models.AgTipo.objects.all()
    serializer_class = serializers.AgTipoSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_tipo','tipo']

# # @authentication_classes([TokenAuthentication])
# # @permission_classes([IsAuthenticated])   
# class AgFactAgendaViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     serializer_class = serializers.AgFactAgendaSerializer
#     queryset = models.AgFactAgenda.objects.all()

#     # def list(self, request):
#     #     year_start, year_end = self.get_year_range(date.today().year)
#     #     agendas_ano = models.AgFactAgenda.objects.filter(data__range=[year_start, year_end])
#     #     serializer = serializers.AgFactAgendaSerializer(agendas_ano, many=True)
#     #     return Response(serializer.data)

#     # def get_year_range(self, year):
#     #     start = date(year, 1, 1)
#     #     end = date(year, 12, 31)
#     #     return start, end