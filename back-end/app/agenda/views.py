from app.agenda import models as agenda_models
from rest_framework import viewsets
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.
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
class SgFuncaoGestorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = agenda_models.SgFuncaoGestor.objects.all()
    serializer_class = serializers.SgFuncaoGestorSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id_func_gest','id_funcao','id_user', 'data_inicio','data_fim']

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