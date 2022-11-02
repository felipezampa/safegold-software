from django.shortcuts import render
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import (TemplateView,ListView,CreateView,DeleteView,UpdateView,DetailView)
from . import models

class IndexView(TemplateView):
     template_name = 'crud_app/index.html'
#############################     EMPRESA     #############################
class EmpresaListView(ListView):
    template_name = 'crud_app/EmpresaTabela.html'
    model = models.Empresas
    context_object_name: 'empresa'

class EmpresaCreateView(CreateView):
    template_name = 'crud_app/EmpresaTabela.html'
    model = models.Empresas

class EmpresaDeleteView(DeleteView):
     model = models.Empresas
     template_name= 'crud_app/excluir-cadastro.html'
     success_url = reverse_lazy("crud_app:list")

class EmpresaUpdateView(UpdateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Empresas
    success_url = reverse_lazy("crud_app:list")

class EmpresaDetailView(DetailView):
    model = models.Empresas
    template_name = 'crud_app/detail.html'
#############################     EMPRESA     #############################
#############################     PROJETO     #############################
class ProjetoListView(ListView):
    template_name = 'crud_app/tabela.html'
    model = models.Projetos

class ProjetoCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDeleteView(DeleteView):
     model = models.Conta
     template_name= 'crud_app/excluir-cadastro.html'
     success_url = reverse_lazy("crud_app:list")

class ProjetoUpdateView(UpdateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDetailView(DetailView):
    model = models.Projetos 
    template_name = 'crud_app/detail.html'
#############################     PROJETO     #############################
#############################    DIMCONTAS    #############################
class ProjetoListView(ListView):
    template_name = 'crud_app/tabela.html'
    model = models.Projetos

class ProjetoCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDeleteView(DeleteView):
     model = models.Conta
     template_name= 'crud_app/excluir-cadastro.html'
     success_url = reverse_lazy("crud_app:list")

class ProjetoUpdateView(UpdateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDetailView(DetailView):
    model = models.Projetos 
    template_name = 'crud_app/detail.html'
#############################    DIMCONTAS    #############################
############################# CONTAFORNECEDOR #############################
class ProjetoListView(ListView):
    template_name = 'crud_app/tabela.html'
    model = models.Projetos

class ProjetoCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDeleteView(DeleteView):
     model = models.Conta
     template_name= 'crud_app/excluir-cadastro.html'
     success_url = reverse_lazy("crud_app:list")

class ProjetoUpdateView(UpdateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDetailView(DetailView):
    model = models.Projetos 
    template_name = 'crud_app/detail.html'
############################# CONTAFORNECEDOR #############################