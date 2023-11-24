from django.db import models

# Create your models here.
class LandingPage(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    telefone = models.CharField(max_length=255, blank=True, null=True)
    cargo = models.CharField(max_length=255, blank=True, null=True)
    segmento_empresa = models.CharField(max_length=255, blank=True, null=True)
    faturamento = models.CharField(max_length=255, blank=True, null=True)
    data_post = models.DateTimeField(auto_now_add=True)
    origem = models.CharField(max_length=255, blank=True, null=True)

    
    class Meta:
        managed = False
        db_table = 'landing_page'

    def __str__(self):
        return '{}  / {}'.format(self.nome, self.email)