from enum import unique
from tabnanny import verbose
from django.db import models
from django.utils import timezone
from django.urls import reverse

# Create your models here.
class Conta(models.Model):
    id = models.BigAutoField(primary_key=True)
    desc = models.CharField(max_length=200,verbose_name='Descrição')
    fornecedor = models.ForeignKey('Fornecedor', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'crud_app_conta'
        verbose_name_plural = 'Conta'

    def __str__(self):
        return "{} - {}".format(self.fornecedor, self.desc)
 
    def get_absolute_url(self):
        return reverse('index')

class Fornecedor(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=256)
    documento = models.CharField(unique=True, max_length=256)

    class Meta:
        managed = False
        verbose_name_plural = 'Fornecedor'
        db_table = 'crud_app_fornecedor'

    def __str__(self):
        return "{}".format(self.nome)

    def get_absolute_url(self):
        return reverse('index')