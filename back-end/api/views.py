from django.shortcuts import render

from crud_app import models

from api import serializers

from django.http import JsonResponse

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

# Create your views here.



### ---------> EMPRESAS API <--------- ###
@csrf_exempt
def empresa_list_api(request):
    if request.method == 'GET':
        empresa = models.Empresas.objects.all()
        serializer = serializers.EmpresasSerializer(empresa, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = serializers.EmpresasSerializer(data= data)
        if serializer.is_valid():
            serializer.save()
            JsonResponse(serializer.data, status=201)
        JsonResponse(serializer.errors, status=400)

### update and delete         
@csrf_exempt
def empresa_detail_api(request, pk):
    try:
        empresa = models.Empresas.objects.get(cod_empresa=pk)
    except models.Empresas.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = serializers.EmpresasSerializer(empresa)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = serializers.EmpresasSerializer(empresa, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        empresa.delete()
        return HttpResponse(status = 204)
### ---------> EMPRESAS API <--------- ###




### ---------> PROJETOS API ###
@csrf_exempt
def projeto_list_api(request):
    if request.method == 'GET':
        projeto = models.Projetos.objects.all()
        serializer = serializers.ProjetosSerializer(projeto, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = serializers.ProjetosSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            JsonResponse(serializer.data, status = 201)
        JsonResponse(serializer.errors, status=400)

# update and delete  
@csrf_exempt
def projeto_detail_api(request,pk):
    try:
        projeto = models.Projetos.objects.get(cod_projeto=pk)
    except:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = serializers.ProjetosSerializer(projeto)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data =  JSONParser().parse(request)
        serializer = serializers.ProjetosSerializer(projeto, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        projeto.delete()
        return HttpResponse(status=204)
### PROJETOS API <--------- ###
    



def fin_grupocontas_api(request):
    pass

def fin_subgrupocontas_api(request):
    pass
def fin_planocontas_api(request):
    pass




### ---------> USERS API  ###
@csrf_exempt
def user_list_api(request):
    if request.method == 'GET':
        user = models.User.objects.all()
        serializer = serializers.UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = serializers.UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


### update and delete ###
@csrf_exempt
def user_detail_api(request,pk):
    try:
        user = models.User.objects.get(pk = pk)
        
    except models.User.DoesNotExist:
        return HttpResponse(status=400)

    if request.method =='GET':
        serializer = serializers.UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = serializers.UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)

###  USERS API <--------- ###













## GENERICS
