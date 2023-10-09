from rest_framework import serializers
from .models import *


class FinGrupoContasSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinGrupoContas
        fields = '__all__'

class FinSubgrupoContasSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinSubgrupoContas
        fields = '__all__'

class FinContaAnaliticaSerializer(serializers.ModelSerializer):
    empresa = serializers.StringRelatedField(source='cod_empresa.empresa')
    desc_subgrupo = serializers.StringRelatedField(source='cod_subgrupo_contas.desc_subgrupo_contas')
    class Meta:
        model = FinContaAnalitica
        fields = ('cod_conta_analitica','cod_empresa','empresa','desc_conta','cod_subgrupo_contas','desc_subgrupo')

class MatrizAnaliticaFornecedorSerializer(serializers.ModelSerializer):
    empresa = serializers.StringRelatedField(source='cod_empresa.empresa')
    desc_cod_conta_analitica = serializers.StringRelatedField(source='cod_conta_analitica.desc_conta')
    desc_fornecedor = serializers.StringRelatedField(source='cod_fornecedor.fornecedor')

    class Meta:
        model = MatrizAnaliticaFornecedor
        fields = ('cod_matriz_analitica_fornecedor','cod_empresa','empresa','cod_conta_analitica','desc_cod_conta_analitica','cod_fornecedor','desc_fornecedor','vinculo')

    def update(self, instance, validated_data):
        instance.vinculo = 1
        if validated_data.get('cod_conta_analitica', None) is not None:
            instance.cod_conta_analitica = validated_data['cod_conta_analitica']

        instance.save()
        return instance
    
    def to_representation(self, instance):
        try:
            return super().to_representation(instance)
        except Fornecedor.MultipleObjectsReturned:
            return {
                'error': 'Mais de um Fornecedor associado a esta Matriz Analítica.',
                'instancia com erro': {
                    'cod_matriz_analitica_fornecedor': instance.cod_matriz_analitica_fornecedor
                }
            }

class FornecedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fornecedor
        fields = '__all__'