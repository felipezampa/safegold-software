from django.db import models
from django.contrib.auth.models import User

# Create your models here.
################################################################################################### MODULO AGENDA SOFTWARE ########################################################################################################################


class SgArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    id_unidade = models.ForeignKey('SgUnidadeNegocio', models.DO_NOTHING, db_column='id_unidade', blank=True, null=True)
    area = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_area'
        verbose_name_plural = 'Area'

    def __str__(self):
        return '{} - {} - {}'.format(self.id_area, self.id_unidade,self.area)


# class SgAvaliador(models.Model):
#     id_avaliador = models.AutoField(primary_key=True)
#     id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'sg_avaliador'
#     def __str__(self):
#         return '{} - {}'.format(self.id_avaliador, self.id_user)

# class SgAvaliadorGestor(models.Model):
#     id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)
#     id_avaliador = models.ForeignKey(SgAvaliador, models.DO_NOTHING, db_column='id_avaliador', blank=True, null=True)
#     data_inicio = models.DateField()
#     data_fim = models.DateField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'sg_avaliador_gestor'
#     def __str__(self):
#         return '{} - {} - {} - {}'.format(self.id_user, self.id_avaliador, self.data_inicio, self.data_fim)

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
        return '{} - {} - {} - {}'.format(self.id_funcao, self.id_area,self.funcao, self.carga_horaria)

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
        return '{} - {} - {} - {} - {}'.format(self.id_func_gest, self.id_funcao, self.id_user, self.data_inicio, self.data_fim)

class SgUnidadeNegocio(models.Model):
    id_unidade = models.AutoField(primary_key=True)
    unidade = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_unidade_negocio'
        verbose_name_plural = 'Unidade Negocio'

    def __str__(self):
        return '{} - {}'.format(self.id_unidade, self.unidade)
    
class AgTipo(models.Model):
    id_tipo = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ag_tipo'
        verbose_name_plural = 'Tipo'

    def __str__(self):
        return '{} - {}'.format(self.id_tipo, self.tipo)

# class AgFactAgenda(models.Model):
#     cod_agenda = models.AutoField(primary_key=True)
#     data = models.DateField(blank=True, null=True)
#     dia_semana = models.CharField(max_length=255, blank=True, null=True)
#     tipo = models.ForeignKey('AgTipo', models.DO_NOTHING, db_column='tipo', blank=True, null=True)
#     projetos = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='projetos', blank=True, null=True)
#     atendimento = models.CharField(max_length=255, blank=True, null=True)
#     horas = models.CharField(max_length=255, blank=True, null=True)
#     sg_funcao_gestor = models.ForeignKey('SgFuncaoGestor', models.DO_NOTHING, db_column='sg_funcao_gestor', blank=True, null=True)
#     class Meta:
#         managed = False
#         db_table = 'ag_fact_agenda'
#     def __str__(self):
#         return '{}/{} - {} . {} '.format(self.data, self.dia_semana, self.projetos, self.sg_funcao_gestor)