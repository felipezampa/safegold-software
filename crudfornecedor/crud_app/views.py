from django.shortcuts import render
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import (View,TemplateView,ListView,DetailView,CreateView,DeleteView,UpdateView)
from . import models


class IndexView(TemplateView):
     template_name = 'crud_app/index.html'

class FornecedorListView(ListView):
    template_name = 'crud_app/tabela.html'
    # Example of making your own:
    # context_object_name = 'schools'
    model = models.Fornecedor

class ContaListView(ListView):
    template_name = 'crud_app/tabela.html'
    # Example of making your own:
    # context_object_name = 'schools'
    model = models.Conta

"""
class FornecedorDetailView(DetailView):
    context_object_name = 'fornecedor_details'
    model = models.Fornecedor
    template_name = 'crud_app/school_detail.html'

"""
class ContaCreateView(CreateView):
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Conta

"""
class SchoolUpdateView(UpdateView):
    fields = ("name","principal")
    model = models.School

class SchoolDeleteView(DeleteView):
    model = models.School
    success_url = reverse_lazy("basic_app:list")
"""
#def read_planodecontas(request):
#    conta = Conta.objects.all()
#    return render(request, 'products.html', {'products': products})
#
#def create_planodecontas(request):
#    form = ContaForm(request.POST or None)
#
#    if form.is_valid():
#        form.save()
#        return redirect('list_products')
#
#    return render(request, 'products-form.html', {'form': form})
#
#
#def update_planodecontas(request):
#    conta = Conta.objects.get(id=id)
#    form = ContaForm(request.POST or None, instance=conta)
#
#    if form.is_valid():
#        form.save()
#        return redirect('list_products')
#
#    return render(request, 'products-form.html', {'form': form, 'product': product})
#
#def delete_planodecontas(request):
#    product = Product.objects.get(id=id)
#
#    if request.method == 'POST':
#        product.delete()
#        return redirect('list_products')
#
#    return render(request, 'prod-delete-confirm.html', {'product': product})
