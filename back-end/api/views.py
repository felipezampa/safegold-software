from crud_app import models
from rest_framework import viewsets
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated

'''
    @eduardolcordeiro

    Construção do ViewSet da api

        - queryset = Faz a busca no banco de dados, semelhante a um 'SELECT * FROM xtable'
        - serializer_class = recebe o serializes do serializer.py
        - filter_backends = Implementação de filtros do DRF
        - filterset_fields = Recebe uma lista dos campos que serão filtrados
        - search_fields = Recebe uma lista dos campos que serão filtrados no campo de search

'''
class EmpresaserializerViewSet(viewsets.ModelViewSet):
    queryset = models.Empresas.objects.all()
    serializer_class = serializers.EmpresasSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['cod_empresa','empresa', 'cnpj', 'cod_projeto','cod_projeto__id_user']
    search_fields = ['cod_empresa', 'empresa', 'cnpj','cod_projeto']
    # permission_classes = [IsAuthenticated]


    

class ProjetosViewSet(viewsets.ModelViewSet):
    queryset = models.Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['projeto', 'cod_projeto','id_user']
    search_fields = ['projeto', 'cod_projeto', 'id_user']
    # permission_classes = [IsAuthenticated]





class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']
    # permission_classes = [IsAuthenticated]



class ProjetoUserViewSet(viewsets.ModelViewSet):
    queryset = models.ProjetoUser.objects.all()
    serializer_class = serializers.ProjetoUserSerializer

class FinGrupoContasViewSet(viewsets.ModelViewSet):
    queryset = models.FinGrupoContas.objects.all()
    serializer_class = serializers.FinGrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_grupo_contas','desc_grupo_contas', 'permite_vinculo', 'sumario']

class FinSubgrupoContasViewSet(viewsets.ModelViewSet):
    queryset = models.FinSubgrupoContas.objects.all()
    serializer_class = serializers.FinSubgrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_subgrupo_contas', 'desc_subgrupo_contas', 'cod_grupo_contas']

class FinContaAnaliticaViewSet(viewsets.ModelViewSet):
    queryset = models.FinContaAnalitica.objects.all()
    serializer_class = serializers.FinContaAnaliticaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_empresa', 'cod_conta_analitica', 'desc_conta','cod_subgrupo_contas']

class FornecedorViewset(viewsets.ModelViewSet):
    queryset = models.Fornecedor.objects.all()
    serializer_class = serializers.FornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_fornecedor', 'cod_empresa', 'cnpj', 'empresa', 'insc_est', 'matriz', 'cod_fornec', 'fornecedor']



class MatrizAnaliticaFornecedorViewSet(viewsets.ModelViewSet):
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

# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import AllowAny
# from .serializers import MyTokenObtainPairSerializer

# class MyObtainTokenPairView(TokenObtainPairView):
#     permission_classes = (AllowAny,)
#     serializer_class = MyTokenObtainPairSerializer

