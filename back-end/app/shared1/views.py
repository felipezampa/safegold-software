from django.views.generic import (TemplateView)
from . import models
from django.db.models.signals import pre_save
from django.dispatch import receiver




class IndexView(TemplateView):
     template_name = 'base.html'



@receiver(pre_save, sender=models.AuthUserPermissions)
def set_default_idrh_cargo(sender, instance, **kwargs):
    if instance.idrh_cargo is None:
        instance.idrh_cargo = models.RhCargo.objects.get(id=4)