from django.shortcuts import render
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.views.generic import (TemplateView,ListView,CreateView,DeleteView,UpdateView,DetailView)
from . import models

class IndexView(TemplateView):
     template_name = 'crud_app/index.html'
###########################################################
class  EmpresaListView(ListView):
    template_name = 'crud_app/EmpresaTabela.html'
    model = models.Empresas
    context_object_name: 'empresa'

def create_book(request, pk):
    author = Empresas.objects.get(id=pk)
    books = Book.objects.filter(author=author)
    form = BookForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            book = form.save(commit=False)
            book.author = author
            book.save()
            return redirect("detail-book", pk=book.id)
        else:
            return render(request, "partials/book_form.html", context={
                "form": form
            })

    context = {
        "form": form,
        "author": author,
        "books": books
    }

    return render(request, "create_book.html", context)

class  EmpresaCreateView(CreateView):
    template_name = 'crud_app/EmpresaTabela.html'
    model = models.Empresas
###########################################################


class ContaListView(ListView):
    template_name = 'crud_app/tabela.html'
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
    template_name = 'crud_app/cadastro.html'
    fields = ("desc","fornecedor")
    model = models.Conta
    success_url = reverse_lazy("crud_app:list")

class ContaDetailView(DetailView):
    model = models.Conta 
    template_name = 'crud_app/detail.html'

# def add_empresa(request):
#     name = request.POST.get('empresa')
    
#     # add film
#     film = Film.objects.create(name=name)
    
#     # add the film to the user's list
#     request.user.films.add(film)

#     # return template fragment with all the user's films
#     films = request.user.films.all()
#     return render(request, 'partials/film-list.html', {'films': films})