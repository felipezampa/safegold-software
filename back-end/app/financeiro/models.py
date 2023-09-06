from django.db import models
from app.shared.models import *

# Create your models here.
class FinGrupoContas(models.Model):
    cod_grupo_contas = models.IntegerField(primary_key=True)
    desc_grupo_contas = models.CharField(max_length=300, blank=True, null=True)
    permite_vinculo = models.CharField(max_length=3, blank=True, null=True)
    sumario = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fin_grupo_contas'
        verbose_name_plural = 'PC - Grupo de Contas'

    
    def __str__(self):
        return "{} - {}".format(self.cod_grupo_contas, self.desc_grupo_contas)

class FinSubgrupoContas(models.Model):
    cod_subgrupo_contas = models.IntegerField(primary_key=True)
    desc_subgrupo_contas = models.CharField(max_length=300, blank=True, null=True)
    cod_grupo_contas = models.ForeignKey(FinGrupoContas, models.DO_NOTHING, db_column='cod_grupo_contas', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fin_subgrupo_contas'
        verbose_name_plural = 'PC - SubGrupoContas'


    def __str__(self):
        return "Código Subgrupo: {} - Descrição: {}".format(self.cod_subgrupo_contas, self.desc_subgrupo_contas)

class FinContaAnalitica(models.Model):
    cod_empresa = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='cod_empresa', blank=True, null=True)
    cod_conta_analitica = models.AutoField(primary_key=True)
    desc_conta = models.CharField(max_length=300, blank=True, null=True)
    cod_subgrupo_contas = models.ForeignKey('FinSubgrupoContas', models.DO_NOTHING, db_column='cod_subgrupo_contas', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fin_conta_analitica'
        verbose_name_plural = 'PC - Analitico'


    def __str__(self):
        return "Empresa: {} // Código Analitico: {} - Descrição: {}".format(self.cod_empresa, self.cod_conta_analitica, self.desc_conta)

class Fornecedor(models.Model):
    cod_empresa = models.BigIntegerField(blank=True, null=True)
    cnpj = models.CharField(max_length=255, blank=True, null=True)
    empresa = models.CharField(max_length=255, blank=True, null=True)
    id_fornecedor = models.CharField(max_length=255, blank=True, null=True)
    matriz = models.CharField(max_length=255, blank=True, null=True)
    fornecedor = models.CharField(max_length=255, blank=True, null=True)
    cod_fornecedor = models.CharField(max_length=255,primary_key=True)


    class Meta:
        managed = False
        db_table = 'fornecedores_geral'
        verbose_name_plural = 'Fornecedor'
    def __str__(self):
        return "Fornecedor: {} / Empresa: {} ".format(self.fornecedor, self.empresa)

class MatrizAnaliticaFornecedor(models.Model):
    cod_matriz_analitica_fornecedor = models.AutoField(primary_key=True)
    cod_empresa = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='cod_empresa', blank=True, null=True)
    vinculo = models.IntegerField(blank=True, null=True, default= 0 )
    cod_conta_analitica = models.ForeignKey(FinContaAnalitica, models.DO_NOTHING, db_column='cod_conta_analitica', blank=True, null=True)
    cod_fornecedor = models.ForeignKey(Fornecedor, models.DO_NOTHING, db_column='cod_fornecedor', blank=True, null=True)
    fornecedor = models.CharField(max_length=255, blank=True, null=True)
    cnpj = models.CharField(max_length=255, blank=True, null=True)
    empresa = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'matriz_analitica_fornecedor'
        verbose_name_plural = 'Vinculo Conta-Fornecedor'
    def __str__(self):
        return "Código Analitico: {} // Fornecedor: {}".format(self.cod_conta_analitica, self.cod_fornecedor)
