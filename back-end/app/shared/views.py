from django.views.generic import (TemplateView)
from app.avaliacao import models as avaliacao_models
from app.auth import models as auth_models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import *
from rest_framework import viewsets
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import SearchFilter



class IndexView(TemplateView):
     template_name = 'base.html'



@receiver(pre_save, sender=auth_models.AuthUserPermissions)
def set_default_idrh_cargo(sender, instance, **kwargs):
    if instance.idrh_cargo is None:
        instance.idrh_cargo = models.RhCargo.objects.get(id=4)


# REST

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
class EmpresasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Empresas.objects.all()
    serializer_class = serializers.EmpresasSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']  # Use 'projeto__id_user'
    search_fields = ['cod_empresa', 'empresa', 'cnpj', 'cod_projeto']



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ProjetosViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Projetos.objects.all()
    serializer_class = serializers.ProjetosSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['projeto', 'cod_projeto', 'projetouser__id_user']  # Update the filterset_fields
    search_fields = ['projeto', 'cod_projeto', 'projetouser__id_user']  # Add search fields if needed



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username', 'email', 'id']

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ProjetoUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ProjetoUser.objects.all()
    serializer_class = serializers.ProjetoUserSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['cod_projeto', 'id_user']  # Update the filterset_fields
    search_fields = ['cod_projeto__projeto']  # Add search fields if needed