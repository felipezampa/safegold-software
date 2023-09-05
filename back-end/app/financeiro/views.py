from app.financeiro import models as financeiro_models
from rest_framework import viewsets
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, authentication_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class GrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinGrupoContas.objects.all()
    serializer_class = serializers.FinGrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_grupo_contas','desc_grupo_contas', 'permite_vinculo', 'sumario']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SubgrupoContasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinSubgrupoContas.objects.all()
    serializer_class = serializers.FinSubgrupoContasSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_subgrupo_contas', 'desc_subgrupo_contas', 'cod_grupo_contas']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ContaAnaliticaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.FinContaAnalitica.objects.all()
    serializer_class = serializers.FinContaAnaliticaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_empresa', 'cod_conta_analitica', 'desc_conta','cod_subgrupo_contas']

# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
class FornecedorViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = financeiro_models.Fornecedor.objects.all()
    serializer_class = serializers.FornecedorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['cod_fornecedor', 'cod_empresa', 'cnpj', 'empresa',  'matriz', 'fornecedor']


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
