from rest_framework import serializers
from .models import *

# class RHCargoSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = RhCargo
#         fields = '__all__'
        
class RhClassificacaoCompSerializers(serializers.ModelSerializer):
    class Meta:
        model =  RhClassificacaoComp
        fields = '__all__'

# class RhFactCargoMetasSerializers(serializers.ModelSerializer):
#     nome_cargo = serializers.StringRelatedField(source='idrh_cargo.nome_cargo')
#     indicador = serializers.StringRelatedField(source = 'idrh_fact_comportamental.indicador')
#     competencia = serializers.StringRelatedField(source = 'idrh_fact_comportamental.competencia')
#     classificacao = serializers.StringRelatedField(source = 'idrh_classificacao_comp.classificacao')
#     class Meta:
#         model =  RhFactCargoMetas
#         fields = 'id', 'idrh_cargo','nome_cargo','idrh_fact_comportamental', 'indicador','competencia','idrh_classificacao_comp','classificacao','valor_ncf','qtde_indicadores','peso_indicadores' 

# class RhFactComportamentalSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = RhFactComportamental
#         fields = '__all__'


# class RhMapCargoCompSerializers(serializers.ModelSerializer):
#     nome_cargo = serializers.StringRelatedField(source='idrh_cargo.nome_cargo')
#     indicador = serializers.StringRelatedField(source = 'idrh_fact_comportamental.indicador')
#     competencia = serializers.StringRelatedField(source = 'idrh_fact_comportamental.competencia')
#     classificacao = serializers.StringRelatedField(source = 'idrh_classificacao_comp.classificacao')

#     class Meta:
#         model = RhMapCargoComp
#         fields = 'id', 'idrh_cargo','nome_cargo','idrh_fact_comportamental', 'indicador','competencia','idrh_classificacao_comp','classificacao','instrucoes'


# class RhUserAvaliacaoSerializers(serializers.ModelSerializer):

#     class Meta:
#         model = RhUserAvaliacao
#         fields = ''
