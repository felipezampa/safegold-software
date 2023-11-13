from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class AgTipo(models.Model):
    id_tipo = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ag_tipo'
        verbose_name_plural = 'Tipo'

    def __str__(self):
        return f'{self.tipo}'

class SgArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    id_unidade = models.ForeignKey('SgUnidadeNegocio', models.DO_NOTHING, db_column='id_unidade', blank=True, null=True)
    area = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_area'
        verbose_name_plural = 'Area'

    def __str__(self):
        return f'{self.id_unidade} - {self.area}'

class SgFuncao(models.Model):
    id_funcao = models.AutoField(primary_key=True)
    id_area = models.ForeignKey(SgArea, models.DO_NOTHING, db_column='id_area', blank=True, null=True)
    funcao = models.CharField(max_length=40, blank=True, null=True)
    carga_horaria = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_funcao'
        verbose_name_plural = 'Funcao'

    def __str__(self):
        return f'{self.id_area} - {self.funcao}'

class SgFuncaoGestor(models.Model):
    id_func_gest = models.AutoField(primary_key=True)
    id_funcao = models.ForeignKey(SgFuncao, models.DO_NOTHING, db_column='id_funcao', blank=True, null=True)
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)
    data_inicio = models.DateField()
    data_fim = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_funcao_gestor'
        verbose_name_plural = 'Funcao Gestor'

    def __str__(self):
        return f'{self.id_funcao.funcao} - {self.id_user.username} - Data Fim: {self.data_fim}'

class SgUnidadeNegocio(models.Model):
    id_unidade = models.AutoField(primary_key=True)
    unidade = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_unidade_negocio'
        verbose_name_plural = 'Unidade Negocio'

    def __str__(self):
        return f'{self.unidade}'

class AgFactAgenda(models.Model):
    cod_agenda = models.AutoField(primary_key=True)
    data = models.DateField(blank=True, null=True)
    dia_semana = models.CharField(max_length=255, blank=True, null=True)
    cod_tipo = models.ForeignKey(AgTipo, models.DO_NOTHING, db_column='cod_tipo', blank=True, null=True)
    cod_projeto = models.ForeignKey('shared.Projetos', models.DO_NOTHING, db_column='cod_projeto', blank=True, null=True)
    atendimento = models.CharField(max_length=255, blank=True, null=True)
    horas = models.CharField(max_length=255, blank=True, null=True)
    funcao_gestor = models.ForeignKey(SgFuncaoGestor, models.DO_NOTHING, db_column='funcao_gestor', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ag_fact_agenda'
        verbose_name_plural = 'Agenda'

    def __str__(self):
        return f'{self.data}  - {self.cod_projeto} / {self.funcao_gestor.id_user.username} '