from rest_framework import serializers
from crud_app.models import  *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProjetosSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    class Meta:
        model = Projetos
        fields = ('cod_projeto','projeto','ativo','safegold_ger','id_user')


class EmpresasSerializer(serializers.ModelSerializer):
    cod_projeto = ProjetosSerializer()
    class Meta:
        model = Empresas
        fields = ('cod_empresa', 'empresa','data_cadastro','data_atualiza','safegold_ger', 'cnpj','cod_projeto' )
    
class MatrizContaFornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatrizContaFornecedor
        fields = '__all__'


class DimcontasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimcontas
        fields = '__all__'







##

