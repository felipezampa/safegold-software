from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
        app_label = 'auth'
    
    def __str__(self):
        return 'id: {} - cargo: {} - financeiro: {} - avaliacao: {} - head de area: {}'.format(self.id_user, self.idrh_cargo, self.financeiro, self.avaliacao,self.is_head)