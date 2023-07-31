from .models import *
from rest_framework import serializers

class SgUnidadedeNegocioSerializers(serializers.ModelSerializer):
    class Meta:
        model = SgUnidadeNegocio
        fields = '__all__'

class SgAreaSerializers(serializers.ModelSerializer):
    unidade = serializers.StringRelatedField(source='id_unidade.unidade')
    class Meta:
        model = SgArea
        fields =  'id_area', 'id_unidade', 'area', 'unidade'

class SgFuncaoSerializers(serializers.ModelSerializer):
    area = serializers.StringRelatedField(source='id_area.area')
    class Meta:
        model = SgFuncao
        fields = 'id_funcao','id_area','area','funcao','carga_horaria'

class SgFuncaoGestorSerializers(serializers.ModelSerializer):
    funcao = serializers.StringRelatedField(source='id_funcao.funcao')
    username = serializers.StringRelatedField(source='id_user.first_name')
    area = serializers.StringRelatedField(source='id_funcao.id_area.area')
    unidade_de_negocios = serializers.StringRelatedField(source='id_funcao.id_area.id_unidade.unidade')

    class Meta:
        model = SgFuncaoGestor
        fields = 'id_func_gest','id_funcao','funcao', 'id_user','funcao', 'data_inicio','data_fim','username','area','unidade_de_negocios'
        
class AgTipoSerializers(serializers.ModelSerializer):
    class Meta:
        model = AgTipo
        fields = '__all__'

# class AgFactAgendaSerializer(serializers.ModelSerializer):
#     funcao_gestor = serializers.SerializerMethodField()
#     tipo_nome = serializers.StringRelatedField(source='tipo.tipo')
#     projeto_nome =serializers.StringRelatedField(source='projetos.projeto')
#     def get_funcao_gestor(self, obj):
#         funcao_gestor = SgFuncaoGestorSerializers(obj.sg_funcao_gestor).data
#         return funcao_gestor

#     class Meta:
#         model = AgFactAgenda
#         fields = 'cod_agenda','data','dia_semana','tipo','tipo_nome','projetos','projeto_nome','atendimento','horas','funcao_gestor'