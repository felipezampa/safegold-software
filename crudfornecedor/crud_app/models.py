from django.db import models
from django.utils import timezone
from django.urls import reverse

# Create your models here.
# class Conta(models.Model):
#     fornecedor = models.ForeignKey('Fornecedor.id',on_delete=models.CASCADE)
#     desc = models.CharField(max_length=200)
# 
#     def get_absolute_url(self):
#         return reverse("post_detail",kwargs={'pk':self.pk})
# 
#     def __str__(self):
#         return self.title
# 
#
# class Fornecedor(models.Model):
#    nome = models.CharField(max_length=200)
#    id = models.IntegerField()
#
#    def get_absolute_url(self):
#        return reverse("post_list")
#
#    def __str__(self):
#        return self.text
