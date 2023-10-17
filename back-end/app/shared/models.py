from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
CHOICES_BOOL = (
    (0,'Não'),
    (1,'Sim'),
)

########################### GERAL
class Estado(models.Model):
    uf = models.CharField(primary_key=True,max_length=2)
    nome = models.CharField(max_length=60, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estado'

    def __str__(self):
        return "{}".format(self.nome)

class SegmentoProjeto(models.Model):
    segmento = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'segmento_projeto'
        verbose_name_plural = 'Segmentos'
    
    def __str__(self):
        return "{}".format(self.segmento)

class Projetos(models.Model):
    cod_projeto = models.BigAutoField(primary_key=True)
    projeto = models.CharField(max_length=50, blank=True, null=True)
    cod_segmento = models.ForeignKey('SegmentoProjeto', models.DO_NOTHING, db_column='cod_segmento', blank=True, null=True)
    ativo = models.BooleanField(blank=True, null=True)
    acesso_financeiro = models.BooleanField(blank=True, null=True)
    cep = models.CharField(max_length=20, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    data_atualiza = models.DateTimeField(auto_now=True)
    estado = models.ForeignKey('Estado', models.DO_NOTHING, db_column='estado', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projetos'
        verbose_name_plural = 'Projetos'
        ordering = ['-ativo','projeto']

    def __str__(self):
        return "{} -  Projeto Ativo: {}".format(self.projeto, 'Sim' if self.ativo == 1 else 'Não')

    def save(self, *args, **kwargs):
        if not self.cod_projeto:
            # This is a new instance, set the created_at field
            self.created_at = timezone.now()
            self.ativo = True
        super().save(*args, **kwargs)

class Empresas(models.Model):
    cod_empresa = models.BigAutoField(primary_key=True)
    cod_projeto = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='cod_projeto', blank=True, null=True, verbose_name='Projeto')
    empresa = models.CharField(max_length=255, blank=True, null=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    data_atualiza = models.DateTimeField(auto_now=True)
    safegold_ger = models.IntegerField(blank=True, null=True, default=1, choices=CHOICES_BOOL, verbose_name='Safegold Gerência? ')    
    cnpj = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'empresas'
        verbose_name_plural = 'Empresas'
        ordering = ['-cod_empresa']

    def __str__(self):
        return "{}".format(self.empresa) 
        
class ProjetoUser(models.Model):
    cod_projeto = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='cod_projeto')
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user')

    class Meta:
        managed = False
        db_table = 'projeto_user'
        unique_together = (("cod_projeto", "id_user"))

    def __str__(self):
        return "{} -- {}".format(self.cod_projeto, self.id_user)
    