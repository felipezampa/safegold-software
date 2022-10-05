from django.views.generic import TemplateView,CreateView
from django.shortcuts import render
# Create your views here.

def index(request):
    return render(request,'crud_app/index.html')


# class HomePageView(CreateView):
#     model = Conta
#     template_name = 'crud_app/index.html'
#     def get_queryset(self):
#         return Conta.active.filter(user=self.request.user).order_by('-pub_date')[:5]



