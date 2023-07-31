from . import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

# Create your views here.
@receiver(pre_save, sender=models.AuthUserPermissions)
def set_default_idrh_cargo(sender, instance, **kwargs):
    if instance.idrh_cargo is None:
        instance.idrh_cargo = models.RhCargo.objects.get(id=4)


from app.avaliacao import models as avaliacao_models
from rest_framework import viewsets
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
