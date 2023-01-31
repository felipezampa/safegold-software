from django.shortcuts import render , redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import (TemplateView,ListView,CreateView,DeleteView,UpdateView,DetailView)
from . import models
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import json
from django.core.paginator import Paginator
from django.db.models import Q
import datetime
import csv
from django.contrib import auth, messages
from django.views import View



class IndexView(TemplateView):
     template_name = 'base.html'



#############################     EMPRESA     #############################
def ativos(request):
    if request.user.is_authenticated:
        id = request.user.id
        user_table = models.Projetos.objects.filter(id_user = id)
        user = user_table.all().values('cod_projeto')

        projetos_ativos_select = user_table.filter(ativo='1').values()  # ---> filtro pro select

        projetos_ativos = user_table.values('cod_projeto') # ---> tabela com todos
        empresa = models.Empresas.objects.filter(cod_projeto__in=projetos_ativos)
        empresa_all = models.Empresas.objects.filter(cod_projeto__in=user)
        # projetos_ativos = user_table.filter(ativo='1').values('cod_projeto') # ---> tabela só com ativos

        projetos = request.POST.get('projeto', None)
        
        #print(projeto)
        
        projetos_final = user_table.filter(cod_projeto=projetos).values() #
        tabela_geral = user_table.filter(cod_projeto=projetos).values('cod_projeto') #
        teste = models.Empresas.objects.filter(cod_projeto__in=tabela_geral)
        print(teste)
        dados = {
            'projetos_ativos': projetos_ativos_select,
            'user': empresa_all, 
            'empresa': empresa,
            'projetos_final': projetos_final,
            'teste': teste #trocar
        }
       # print('dashboard OK')
        return render(request,'crud_app/empresa/tabela.html', dados)


@csrf_exempt
def saveempresa(request):
    id=request.POST.get('id','')
    type = request.POST.get('type', '')
    value = request.POST.get('value', '')
    print(id,type,value)
    empresa = models.Empresas.objects.get(cod_empresa=id)
    if type == "empresa":
        empresa.empresa = value
    if type == "data_cadastro":
        empresa.data_cadastro = value
    if type == "data_atualiza":
        empresa.data_atualiza = value
    if type == "cnpj":
        empresa.cnpj = value

    empresa.save()
    return JsonResponse({"success":"Updated"})

@csrf_exempt
def insertempresa(request):
    teste=request.POST.get("cod_projeto")
    projeto = models.Projetos.objects.get(cod_projeto=teste)
    empresa = request.POST.get("empresa")
    safegold_ger = request.POST.get("safegold_ger")
    cnpj = request.POST.get("cnpj")
    print(len(cnpj))
    if models.Empresas.objects.filter(cnpj=cnpj).exists(): # ----> validação para cnpj existentes
        print('esse cnpj ja existe')
    # if len(cnpj) >= 17:
    #     messages.error(request, 'invalido')
    else:

        try:    
            #print(projeto,empresa,safegold_ger,cnpj)
            empresa = models.Empresas(cod_projeto=projeto, empresa=empresa, safegold_ger=safegold_ger, cnpj=cnpj)
            #print(empresa)
            empresa.save()
            empresa_data={"cod_empresa": empresa.cod_empresa,"data_cadastro":empresa.data_cadastro,"error":False,"errorMensage":"Empresa adicionada com Sucesso"}
            empresa_data['detail'] = "<a href='/app/empresa/detail/"+str(empresa.pk)+"/' class='mx-3' title='Detalhar Conta'><i class='fa-solid fa-up-right-and-down-left-from-center'></i></a>"
            empresa_data['delete'] = "<a href='/app/empresa/delete/"+str(empresa.pk)+"/' class='mx-3' title='Excluir Conta'><i class='fa-solid fa-trash-can'></i></a>"


            return JsonResponse(empresa_data,safe=False)
        except:
            empresa_data={"error":True,"errorMensage":"Failed to add"}
            return JsonResponse(empresa_data,safe=False)



@csrf_exempt
def update_all(request):
    data=request.POST.get("data")
    dict_data=json.loads(data)
    try:
        for dic_single in dict_data:
            empresa=models.Empresas.objects.get(cod_empresa=dic_single['cod_empresa'])
            empresa.empresa=dic_single['empresa']
            empresa.cnpj=dic_single['cnpj']
            empresa.save()
            print(empresa)
        stuent_data={"error":False,"errorMessage":"Updated Successfully"}
        return JsonResponse(stuent_data,safe=False)
    except:
        stuent_data={"error":True,"errorMessage":"Failed to Update Data"}
        return JsonResponse(stuent_data,safe=False)

@csrf_exempt
def delete_empresa(request):
    id=request.POST.get("cod_empresa")
    print(id)
    try:
        empresa=models.Empresas.objects.get(cod_empresa=id)
        empresa.delete()
        empresa_data={"error":False,"errorMessage":"Deleted Successfully"}
        return JsonResponse(empresa_data,safe=False)
    except:
        empresa_data={"error":True,"errorMessage":"Failed to Delete Data"}
        return JsonResponse(empresa_data,safe=False)
    

class EmpresaDeleteView_teste(View):
    def get(self,request,pk,*args, **kwargs):
        if request.headers.get('x-requested-with') == 'XMLHttpRequest': 

            cod_empresa=request.POST.get("cod_empresa")
            empresa = models.Empresas.objects.get(pk=cod_empresa)
            print(empresa)
            empresa.delete()
            return JsonResponse({"message":"sucess"})
        return JsonResponse({"message": "Wrong request"})

class EmpresaUpdateView_teste(View):
    def post(self,request,pk,*args, **kwargs):
        if request.headers.get('x-requested-with') == 'XMLHttpRequest': 

            pk=request.POST.get("cod_empresa",'')            
            empresa = models.Empresas.objects.get(pk=pk)
            teste=request.POST.get("cod_projeto",'')
            projeto = models.Projetos.objects.get(cod_projeto=teste)
            empresa = request.POST.get("empresa",'')
            safegold_ger = request.POST.get("safegold_ger",'')
            cnpj = request.POST.get("cnpj",'')
            empresa_fin = models.Empresas(cod_projeto=projeto, empresa=empresa, safegold_ger=safegold_ger, cnpj=cnpj)
            empresa_fin.save()


            return JsonResponse({'message':'success'})


        return JsonResponse({'message': 'Wrong request'})









