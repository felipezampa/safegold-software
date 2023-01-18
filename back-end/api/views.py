from crud_app import models
from rest_framework import viewsets
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class EmpresaserializerViewSet(viewsets.ModelViewSet):
    queryset = models.Empresas.objects.all()
    serializer_class = serializers.EmpresasSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']
    search_fields = ['cod_empresa', 'empresa', 'cnpj','cod_projeto']

class MatrizContaFornecedorViewSet(viewsets.ModelViewSet):
    queryset = models.MatrizContaFornecedor.objects.all()
    serializer_class = serializers.MatrizContaFornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['campo1', 'campo2']

class ProjetosViewSet(viewsets.ModelViewSet):
    queryset = models.Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['projeto', 'cod_projeto','id_user']
    search_fields = ['projeto', 'cod_projeto', 'id_user']


class DimcontasViewSet(viewsets.ModelViewSet):
    queryset = models.Dimcontas.objects.all()
    serializer_class = serializers.DimcontasSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['campo1', 'campo2']


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']

