from django.shortcuts import render
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import (TemplateView,ListView,CreateView,DeleteView,UpdateView,DetailView)
from . import models


class IndexView(TemplateView):
     template_name = 'crud_app/index.html'

class ContaListView(ListView):
    template_name = 'crud_app/tabela.html'
    # Example of making your own:
    # context_object_name = 'schools'
    model = models.Conta

class ContaCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Conta
    success_url = reverse_lazy("crud_app:list")

class ContaDeleteView(DeleteView):
    model = models.Conta
    template_name= 'crud_app/excluir-cadastro.html'
    success_url = reverse_lazy("crud_app:list")








class ContaUpdateView(UpdateView):
    fields = ("desc","fornecedor")
    model = models.Conta


class ContaDetailView(DetailView):
    context_object_name = 'fornecedor_details'
    model = models.Fornecedor
    template_name = 'crud_app/school_detail.html'
