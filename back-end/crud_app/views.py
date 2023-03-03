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
from django.db.models.signals import pre_save
from django.dispatch import receiver




class IndexView(TemplateView):
     template_name = 'base.html'



@receiver(pre_save, sender=models.AuthUserPermissions)
def set_default_idrh_cargo(sender, instance, **kwargs):
    if instance.idrh_cargo is None:
        instance.idrh_cargo = models.RhCargo.objects.get(id=4)