from app.agenda import models as agenda_models
from rest_framework import viewsets
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from . import serializers

# Create your views here.

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])   
class AgFactAgendaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = serializers.AgFactAgendaSerializer
    queryset = agenda_models.AgFactAgenda.objects.all()

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])  
class AgTipoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = agenda_models.AgTipo.objects.all()
    serializer_class = serializers.AgTipoSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_tipo','tipo']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SgAreaViewSet(viewsets.ModelViewSet):

    queryset = agenda_models.SgArea.objects.all()

    serializer_class = serializers.SgAreaSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_area','id_unidade', 'area']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SgFuncaoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = agenda_models.SgFuncao.objects.all()
    serializer_class = serializers.SgFuncaoSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_funcao','id_area','funcao','carga_horaria']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SgFuncaoGestorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = agenda_models.SgFuncaoGestor.objects.all()
    serializer_class = serializers.SgFuncaoGestorSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_func_gest','id_funcao','id_user', 'data_inicio','data_fim']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class SgUnidadeNegocioViewSet(viewsets.ModelViewSet):
    queryset = agenda_models.SgUnidadeNegocio.objects.all()
    serializer_class = serializers.SgUnidadedeNegocioSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_unidade','unidade']

