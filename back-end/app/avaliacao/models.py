from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# class RhUserAvaliacao(models.Model):
#     id = models.AutoField(primary_key=True)
#     idauth_user_permissions = models.ForeignKey(AuthUserPermissions, models.DO_NOTHING, db_column='idauth_user_permissions', blank=True, null=True)
#     idrh_fact_comportamental = models.ForeignKey(RhFactComportamental, models.DO_NOTHING, db_column='idrh_fact_comportamental', blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'rh_user_avaliacao'
#         verbose_name_plural = 'Avaliação Comportamental - Avaliado (MANUTENÇÃO)'
#     def __str__(self):
#         return '{} - {}'.format(self.idauth_user_permissions, self.idrh_fact_comportamental)
    

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