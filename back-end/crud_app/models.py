from enum import unique
from tabnanny import verbose
from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import User
# Create your models here.


class Bairros(models.Model):
    id_bairro = models.AutoField(primary_key=True)
    cod_bairro = models.CharField(max_length=10)  
    bairro = models.CharField(max_length=255)     
    uf = models.CharField(max_length=2)

    class Meta:
        managed = False
        db_table = 'bairros'
        verbose_name_plural = 'Bairros'

    def __str__(self):
        return "{} - {}".format(self.bairro,self.uf)



class Cidades(models.Model):
    cod_cidade = models.AutoField(primary_key=True)
    cod_ibge = models.IntegerField()
    cidade = models.CharField(max_length=255)
    uf = models.ForeignKey('Estados', models.DO_NOTHING, db_column='uf')

    class Meta:
        managed = False
        db_table = 'cidades'
        verbose_name_plural = 'Cidades'

    def __str__(self):
        return "{} - {}".format(self.cidade,self.uf)



class Dimcontas(models.Model):
    desc_conta = models.CharField(max_length=255)
    grupo_conta = models.ForeignKey('Dimgrupocontas', models.DO_NOTHING, db_column='desc_grupo_conta', blank=True, null=True)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    data_atualiza = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'dimcontas'
        verbose_name_plural = 'Dimcontas'

    def __str__(self):
        return "{}".format(self.desc_conta)



class Dimgrupocontas(models.Model):
    desc_grupo_conta = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dimgrupocontas'
        verbose_name_plural = 'Dimgrupocontas'

    def __str__(self):
        return "{}".format(self.desc_grupo_conta)



NÃO = 0
SIM = 1

CHOICES_BOOL = (
    (NÃO, 'Não'),
    (SIM,'Sim'),
)


class Estados(models.Model):
    cod_estado = models.IntegerField()
    cod_uf = models.IntegerField()
    estado = models.CharField(max_length=50)
    uf = models.CharField(primary_key=True, max_length=2)
    regiao = models.ForeignKey('Regioes', models.DO_NOTHING, db_column='regiao')

    class Meta:
        managed = False
        db_table = 'estados'        
        verbose_name_plural = 'Estados'

    def __str__(self):
        return "{}".format(self.estado)






class Pais(models.Model):
    cod_pais = models.BigAutoField(primary_key=True)
    pais = models.CharField(max_length=60, blank=True, null=True)
    pais_pt = models.CharField(max_length=60, blank=True, null=True)
    sigla = models.CharField(max_length=2, blank=True, null=True)
    bacen = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pais'
        verbose_name_plural = 'Paises'      
          
    def __str__(self):
        return "{}".format(self.pais)
    

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

class Projetos(models.Model):
    id_user = models.ManyToManyField(User, through='ProjetoUser')
    cod_projeto = models.BigAutoField(primary_key=True)
    projeto = models.CharField(max_length=255, blank=True, null=True)
    chave_integracao = models.CharField(max_length=255, blank=True, null=True)
    cod_usuario = models.IntegerField(blank=True, null=True)
    chave_inteligente = models.CharField(max_length=255, blank=True, null=True)
    cod_segmento = models.IntegerField(blank=True, null=True)
    ativo = models.IntegerField(blank=True, null=True)
    cor = models.CharField(max_length=255, blank=True, null=True)
    avatar_nome_arq = models.CharField(max_length=255, blank=True, null=True)
    avatar_tipo = models.CharField(max_length=255, blank=True, null=True)
    avatar_tamanho = models.BigIntegerField(blank=True, null=True)
    avatar_atualizacao = models.DateTimeField(blank=True, null=True)
    tipo_endereco = models.CharField(max_length=255, blank=True, null=True)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    end_numero = models.CharField(max_length=255, blank=True, null=True)
    end_compl = models.CharField(max_length=255, blank=True, null=True)
    bairro = models.CharField(max_length=255, blank=True, null=True)
    cep = models.CharField(max_length=255, blank=True, null=True)
    end_estado = models.CharField(max_length=255, blank=True, null=True)
    data_fecha = models.DateField(blank=True, null=True)
    id_importacao = models.IntegerField(blank=True, null=True)
    end_cidade = models.CharField(max_length=255, blank=True, null=True)
    cidade = models.CharField(max_length=255, blank=True, null=True)
    resp_email = models.CharField(max_length=255, blank=True, null=True)
    resp_nome = models.CharField(max_length=255, blank=True, null=True)
    resp_cod = models.CharField(max_length=255, blank=True, null=True)
    job_state = models.CharField(max_length=255, blank=True, null=True)
    job_report = models.TextField(blank=True, null=True)
    job_id = models.IntegerField(blank=True, null=True)
    data_criacao = models.DateTimeField()
    data_atualiza = models.DateTimeField()
    legacy_id = models.IntegerField(blank=True, null=True)
    safegold_ger = models.IntegerField(blank=True, null=True)
    cod_sub_segmento = models.IntegerField(blank=True, null=True)
    sandbox = models.IntegerField(blank=True, null=True)
    class Meta:
        managed = True
        db_table = 'projetos'
        verbose_name_plural = 'Projetos'

    def __str__(self):
        return "{}".format(self.projeto)


class ProjetoUser(models.Model):
    cod_projeto = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='cod_projeto')
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user')

    class Meta:
        managed = False
        db_table = 'projeto_user'
        unique_together = (("cod_projeto", "id_user"),)

    def __str__(self):
        return "{} -- {}".format(self.cod_projeto, self.id_user)

class Regioes(models.Model):
    cod_regiao = models.AutoField(primary_key=True)
    regiao = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'regioes'
        verbose_name_plural = 'Regioes'        
    
    def __str__(self):
        return "{}".format(self.regiao)






# Plano de Contas Models

class FinGrupoContas(models.Model):
    cod_grupo_contas = models.IntegerField(primary_key=True)
    desc_grupo_contas = models.CharField(max_length=300, blank=True, null=True)
    permite_vinculo = models.CharField(max_length=3, blank=True, null=True)
    sumario = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fin_grupo_contas'
        verbose_name_plural = 'Grupo de Contas // Plano de Contas'

    
    def __str__(self):
        return "{} - {}".format(self.cod_grupo_contas, self.desc_grupo_contas)

class FinSubgrupoContas(models.Model):
    cod_subgrupo_contas = models.IntegerField(primary_key=True)
    desc_subgrupo_contas = models.CharField(max_length=300, blank=True, null=True)
    cod_grupo_contas = models.ForeignKey(FinGrupoContas, models.DO_NOTHING, db_column='cod_grupo_contas', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fin_subgrupo_contas'
        verbose_name_plural = 'SubgrupoContas // Plano de Contas'


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
        verbose_name_plural = 'Analitico // Plano de Contas'


    def __str__(self):
        return "Empresa: {} // Código Analitico: {} - Descrição: {}".format(self.cod_empresa, self.cod_conta_analitica, self.desc_conta)

class Fornecedor(models.Model):
    cod_fornecedor = models.AutoField(primary_key=True)
    cod_empresa = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='cod_empresa', blank=True, null=True)
    cnpj = models.CharField(max_length=14, blank=True, null=True)
    empresa = models.CharField(max_length=200, blank=True, null=True)
    insc_est = models.CharField(max_length=20, blank=True, null=True)
    matriz = models.CharField(max_length=3, blank=True, null=True)
    cod_fornec = models.IntegerField(blank=True, null=True)
    fornecedor = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fornecedor'
        verbose_name_plural = 'Fornecedor'
    def __str__(self):
        return "Fornecedor: {} ".format(self.fornecedor)


class MatrizAnaliticaFornecedor(models.Model):
    cod_matriz_analitica_fornecedor = models.AutoField(primary_key=True)
    cod_empresa = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='cod_empresa', blank=True, null=True)
    vinculo = models.IntegerField(blank=True, null=True, default= 0 )
    cod_conta_analitica = models.ForeignKey(FinContaAnalitica, models.DO_NOTHING, db_column='cod_conta_analitica', blank=True, null=True)
    cod_fornecedor = models.ForeignKey(Fornecedor, models.DO_NOTHING, db_column='cod_fornecedor', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'matriz_analitica_fornecedor'
        verbose_name_plural = 'Vinculo de Fornecedor á Conta Analitica'
    def __str__(self):
        return "Código Analitico: {} // Fornecedor: {}".format(self.cod_conta_analitica, self.cod_fornecedor)






#### TESTES




