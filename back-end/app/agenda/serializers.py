from . import models as agenda_models
from rest_framework import serializers


class AgTipoSerializers(serializers.ModelSerializer):
    class Meta:
        model = agenda_models.AgTipo
        fields = '__all__'

class SgAreaSerializers(serializers.ModelSerializer):
    unidade = serializers.StringRelatedField(source='id_unidade.unidade')
    class Meta:
        model = agenda_models.SgArea
        fields =  'id_area', 'id_unidade', 'area', 'unidade'

class SgFuncaoSerializers(serializers.ModelSerializer):
    area = serializers.StringRelatedField(source='id_area.area')
    class Meta:
        model = agenda_models.SgFuncao
        fields = 'id_funcao','id_area','area','funcao','carga_horaria'

class SgFuncaoGestorSerializers(serializers.ModelSerializer):
    funcao = serializers.StringRelatedField(source='id_funcao.funcao')
    username = serializers.SerializerMethodField()
    area = serializers.StringRelatedField(source='id_funcao.id_area.area')
    unidade_de_negocios = serializers.StringRelatedField(source='id_funcao.id_area.id_unidade.unidade')

    class Meta:
        model = agenda_models.SgFuncaoGestor
        fields = '__all__'
    
    def get_username(self, obj):
        # Concatenate first_name and last_name of the related user
        return f"{obj.id_user.first_name} {obj.id_user.last_name}"
        
class SgUnidadedeNegocioSerializers(serializers.ModelSerializer):
    class Meta:
        model = agenda_models.SgUnidadeNegocio
        fields = '__all__'

class AgFactAgendaSerializer(serializers.ModelSerializer):
    tipo = serializers.StringRelatedField(source='cod_tipo.tipo')
    projeto =serializers.StringRelatedField(source='cod_projeto.projeto')

    class Meta:
        model = agenda_models.AgFactAgenda
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['funcao_gestor'] =  SgFuncaoGestorSerializers(read_only=True)
        return super(AgFactAgendaSerializer, self).to_representation(instance)