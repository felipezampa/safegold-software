from django.db import models
from django.contrib.auth.models import User
# Create your models here.

NÃO = 0
SIM = 1

CHOICES_BOOL = (
    (NÃO, 'Não'),
    (SIM,'Sim'),
)

########################### GERAL
class Estado(models.Model):
    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=60, blank=True, null=True)
    uf = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estado'

class Projetos(models.Model):
    cod_projeto = models.BigAutoField(primary_key=True)
    projeto = models.CharField(max_length=50, blank=True, null=True)
    cod_segmento = models.IntegerField(blank=True, null=True)
    ativo = models.IntegerField(blank=True, null=True)
    cep = models.CharField(max_length=20, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    data_cadastro = models.DateTimeField()
    data_atualiza = models.DateTimeField()
    estado = models.ForeignKey('estado', models.DO_NOTHING, db_column='estado', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'projetos'
        verbose_name_plural = 'Projetos'
    
    def __str__(self):
        return "{}".format(self.projeto)

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
########################### FIN
class ProjetoUser(models.Model):
    cod_projeto = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='cod_projeto')
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user')

    class Meta:
        managed = False
        db_table = 'projeto_user'
        unique_together = (("cod_projeto", "id_user"),)

    def __str__(self):
        return "{} -- {}".format(self.cod_projeto, self.id_user)
    

# Plano de Contas Models







#### MODULO RH, AVALIAÇÃO DE DESEMPENHO


class AuthUserPermissions(models.Model):
    id = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)
    financeiro = models.IntegerField(blank=True, null=True)
    avaliacao = models.IntegerField(blank=True, null=True)
    is_head = models.IntegerField(blank=True, null=True)
    # idrh_cargo = models.ForeignKey('RhCargo', models.DO_NOTHING, db_column='idrh_cargo',default=4, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_user_permissions'
        verbose_name_plural = 'Permissionamentos por usuario'
    
    def __str__(self):
        return 'id: {} - cargo: {} - financeiro: {} - avaliacao: {} - head de area: {}'.format(self.id_user, self.idrh_cargo, self.financeiro, self.avaliacao,self.is_head)
    

class RhClassificacaoComp(models.Model):
    id = models.AutoField(primary_key=True)
    classificacao = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rh_classificacao_comp'
        verbose_name_plural = 'Classificação Comportamental'
    def __str__(self):
        return '{}'.format(self.classificacao)


# class RhFactCargoMetas(models.Model):
#     id = models.AutoField(primary_key=True)
#     idrh_cargo = models.ForeignKey(fun, models.DO_NOTHING, db_column='idrh_cargo', blank=True, null=True)
#     idrh_fact_comportamental = models.ForeignKey('RhFactComportamental', models.DO_NOTHING, db_column='idrh_fact_comportamental', blank=True, null=True)
#     valor_ncf = models.FloatField(blank=True, null=True)
#     idrh_classificacao_comp = models.ForeignKey(RhClassificacaoComp, models.DO_NOTHING, db_column='idrh_classificacao_comp', blank=True, null=True)
#     qtde_indicadores = models.IntegerField(blank=True, null=True)
#     peso_indicadores = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'rh_fact_cargo_metas'
#         verbose_name_plural = 'Metas por Cargo '
#     def __str__(self):
#         return '{}'.format(self.idrh_cargo)

class RhFactComportamental(models.Model):
    id = models.AutoField(primary_key=True)
    indicador = models.CharField(max_length=255, blank=True, null=True)
    competencia = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rh_fact_comportamental'
        verbose_name_plural = 'Competencias de indicadores'
    def __str__(self):
        return '{} - {}'.format(self.indicador, self.competencia)

# class RhMapCargoComp(models.Model):
#     id = models.AutoField(primary_key=True)
#     idrh_cargo = models.ForeignKey(RhCargo, models.DO_NOTHING, db_column='idrh_cargo', blank=True, null=True)
#     idrh_fact_comportamental = models.ForeignKey(RhFactComportamental, models.DO_NOTHING, db_column='idrh_fact_comportamental', blank=True, null=True)
#     idrh_classificacao_comp = models.ForeignKey(RhClassificacaoComp, models.DO_NOTHING, db_column='idrh_classificacao_comp', blank=True, null=True)
#     instrucoes = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'rh_map_cargo_comp'
#         verbose_name_plural = 'Mapeamento de Comportamentos'
#     def __str__(self):
#         return '{} - {} - {}'.format(self.idrh_fact_comportamental,self.idrh_classificacao_comp, self.idrh_cargo)

class RhUserAvaliacao(models.Model):
    id = models.AutoField(primary_key=True)
    idauth_user_permissions = models.ForeignKey(AuthUserPermissions, models.DO_NOTHING, db_column='idauth_user_permissions', blank=True, null=True)
    idrh_fact_comportamental = models.ForeignKey(RhFactComportamental, models.DO_NOTHING, db_column='idrh_fact_comportamental', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rh_user_avaliacao'
        verbose_name_plural = 'Avaliação Comportamental - Avaliado (MANUTENÇÃO)'
    def __str__(self):
        return '{} - {}'.format(self.idauth_user_permissions, self.idrh_fact_comportamental)


class AptoProj(models.Model):
    story_id = models.CharField(max_length=4, blank=True, null=True)
    data_apto = models.DateField(blank=True, null=True)
    vlr_apto = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'apto_proj'
        verbose_name_plural = 'Apontamento Gestor'
    def __str__(self):
        return '{} - {}'.format(self.data_apto, self.vlr_apto)
    




################################################################################################### MODULO AGENDA SOFTWARE ########################################################################################################################


class SgArea(models.Model):
    id_area = models.AutoField(primary_key=True)
    id_unidade = models.ForeignKey('SgUnidadeNegocio', models.DO_NOTHING, db_column='id_unidade', blank=True, null=True)
    area = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_area'
    def __str__(self):
        return '{} - {} - {}'.format(self.id_area, self.id_unidade,self.area)


class SgAvaliador(models.Model):
    id_avaliador = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_avaliador'
    def __str__(self):
        return '{} - {}'.format(self.id_avaliador, self.id_user)

class SgAvaliadorGestor(models.Model):
    id_user = models.ForeignKey(User, models.DO_NOTHING, db_column='id_user', blank=True, null=True)
    id_avaliador = models.ForeignKey(SgAvaliador, models.DO_NOTHING, db_column='id_avaliador', blank=True, null=True)
    data_inicio = models.DateField()
    data_fim = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_avaliador_gestor'
    def __str__(self):
        return '{} - {} - {} - {}'.format(self.id_user, self.id_avaliador, self.data_inicio, self.data_fim)

class SgFuncao(models.Model):
    id_funcao = models.AutoField(primary_key=True)
    id_area = models.ForeignKey(SgArea, models.DO_NOTHING, db_column='id_area', blank=True, null=True)
    funcao = models.CharField(max_length=40, blank=True, null=True)
    carga_horaria = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_funcao'
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
    def __str__(self):
        return '{} - {} - {} - {} - {}'.format(self.id_func_gest, self.id_funcao, self.id_user, self.data_inicio, self.data_fim)

class SgUnidadeNegocio(models.Model):
    id_unidade = models.AutoField(primary_key=True)
    unidade = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sg_unidade_negocio'
    def __str__(self):
        return '{} - {}'.format(self.id_unidade, self.unidade)
    
class AgTipo(models.Model):
    id_tipo = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ag_tipo'

    def __str__(self):
        return '{} - {}'.format(self.id_tipo, self.tipo)

class AgFactAgenda(models.Model):
    cod_agenda = models.AutoField(primary_key=True)
    data = models.DateField(blank=True, null=True)
    dia_semana = models.CharField(max_length=255, blank=True, null=True)
    tipo = models.ForeignKey('AgTipo', models.DO_NOTHING, db_column='tipo', blank=True, null=True)
    projetos = models.ForeignKey('Projetos', models.DO_NOTHING, db_column='projetos', blank=True, null=True)
    atendimento = models.CharField(max_length=255, blank=True, null=True)
    horas = models.CharField(max_length=255, blank=True, null=True)
    sg_funcao_gestor = models.ForeignKey('SgFuncaoGestor', models.DO_NOTHING, db_column='sg_funcao_gestor', blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'ag_fact_agenda'
    def __str__(self):
        return '{}/{} - {} . {} '.format(self.data, self.dia_semana, self.projetos, self.sg_funcao_gestor)