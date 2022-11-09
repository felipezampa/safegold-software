from django.shortcuts import render , redirect
from django.urls import reverse_lazy
from django.views.generic import (TemplateView,ListView,CreateView,DeleteView,UpdateView,DetailView)
from . import models
from .forms import EmpresaForm
class IndexView(TemplateView):
     template_name = 'base.html'

#############################     EMPRESA     #############################
class EmpresaListView(ListView):
    template_name = 'crud_app/empresa/tabela.html'
    model = models.Empresas
    def get_context_data(self, **kwargs):
        context = super(EmpresaListView, self).get_context_data(**kwargs)
        context['form'] = EmpresaForm()
        return context

def cadastro_empresa(request):
    if request.POST:
        form = EmpresaForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('crud_app:empresa-list')
    
    return render(request,'crud_app/empresa/tabela.html', {'form': EmpresaForm})

    
class EmpresaCreateView(CreateView):
    template_name = 'crud_app/empresa/cadastro.html'
    fields = ("empresa","cod_projeto","cnpj","safegold_ger")
    model = models.Empresas
    success_url = reverse_lazy("crud_app:empresa-list")

class EmpresaDeleteView(DeleteView):
     model = models.Empresas
     template_name= 'crud_app/empresa/excluir.html'
     success_url = reverse_lazy("crud_app:empresa-list")

class EmpresaUpdateView(UpdateView):
    template_name = 'crud_app/empresa/cadastro.html'
    fields = ("empresa","cod_projeto","cnpj","safegold_ger")
    model = models.Empresas
    success_url = reverse_lazy("crud_app:empresa-list")

class EmpresaDetailView(DetailView):
    model = models.Empresas
    template_name = 'crud_app/empresa/detail.html'
###########################################################################

#############################     PROJETO     #############################
class ProjetoListView(ListView):
    template_name = 'crud_app/tabelas/projeto-tabela.html'
    model = models.Projetos

class ProjetoCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Projetos
    success_url = reverse_lazy("crud_app:list")

class ProjetoDeleteView(DeleteView):
     model = models.Projetos
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
###########################################################################

#############################    DIMCONTAS    #############################
class DimContasListView(ListView):
    template_name = 'crud_app/conta/tabela.html'
    model = models.Dimcontas

class DimContasCreateView(CreateView):
    template_name = 'crud_app/conta/cadastro.html'
    fields = ("desc_conta","id_grupo_conta")
    model = models.Dimcontas
    success_url = reverse_lazy("crud_app:conta-list")

class DimContasDeleteView(DeleteView):
     model = models.Dimcontas
     template_name= 'crud_app/conta/excluir.html'
     success_url = reverse_lazy("crud_app:conta-list")

class DimContasUpdateView(UpdateView):
    template_name = 'crud_app/conta/cadastro.html'
    fields = ("desc_conta","id_grupo_conta")
    model = models.Dimcontas
    success_url = reverse_lazy("crud_app:conta-list")

class DimContasDetailView(DetailView):
    model = models.Dimcontas 
    template_name = 'crud_app/conta/detail.html'
###########################################################################

############################# CONTAFORNECEDOR #############################
class MatrizFornecedorListView(ListView):
    template_name = 'crud_app/matriz/tabela.html'
    model = models.MatrizContaFornecedor

class MatrizFornecedorCreateView(CreateView):
    template_name = 'crud_app/matriz/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.MatrizContaFornecedor
    success_url = reverse_lazy("crud_app:matriz-list")

class MatrizFornecedorDeleteView(DeleteView):
     model = models.MatrizContaFornecedor
     template_name= 'crud_app/matriz/excluir.html'
     success_url = reverse_lazy("crud_app:matriz-list")

class MatrizFornecedorUpdateView(UpdateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.MatrizContaFornecedor
    success_url = reverse_lazy("crud_app:matriz-list")

class MatrizFornecedorDetailView(DetailView):
    model = models.MatrizContaFornecedor 
    template_name = 'crud_app/matriz/detail.html'
###########################################################################





# testes

def cadastro_empresa(request):
    if request.POST:
        form = EmpresaForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('crud_app:empresa-list')
    
    return render(request,'crud_app/empresa/tabela.html', {'form': EmpresaForm})
