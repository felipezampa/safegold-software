from django.shortcuts import render

from crud_app import models

from api import serializers

from django.http import JsonResponse
# Create your views here.


def empresa_list_api(request):
    empresa = models.Empresas.objects.all()
    serializer = serializers.EmpresasSerializer(empresa, many=True)
    return JsonResponse({'Empresas': serializer.data},safe=False)


def projetos_list_api(request):
    projetos = models.Projetos.objects.all()
    serializer = serializers.ProjetosSerializer(projetos, many=True)
    return JsonResponse({'Projetos': serializer.data}, safe=False)


def users_list_api(request):
    user = models.User.objects.all()
    serializer = serializers.UserSerializer(user, many=True)
    return JsonResponse({'Users': serializer.data}, safe=False)

def fin_grupocontas_api(request):
    pass

def fin_subgrupocontas_api(request):
    pass
def fin_planocontas_api(request):
    pass
