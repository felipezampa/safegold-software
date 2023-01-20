from crud_app import models
from rest_framework import viewsets
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated

'''
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
    filterset_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']
    search_fields = ['cod_empresa', 'empresa', 'cnpj','cod_projeto']
    # permission_classes = [IsAuthenticated]

class MatrizContaFornecedorViewSet(viewsets.ModelViewSet):
    queryset = models.MatrizContaFornecedor.objects.all()
    serializer_class = serializers.MatrizContaFornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['campo1', 'campo2']
    # permission_classes = [IsAuthenticated]
    

class ProjetosViewSet(viewsets.ModelViewSet):
    queryset = models.Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['projeto', 'cod_projeto','id_user']
    search_fields = ['projeto', 'cod_projeto', 'id_user']
    # permission_classes = [IsAuthenticated]


class DimcontasViewSet(viewsets.ModelViewSet):
    queryset = models.Dimcontas.objects.all()
    serializer_class = serializers.DimcontasSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['campo1', 'campo2']
    # permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']
    # permission_classes = [IsAuthenticated]



'''

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


