from rest_framework import serializers
from crud_app.models import  *
'''
    Implementaçã do ModelSerializer
        faz a serialização da tabela no models.py

        - é nela que voce pode fazer api's aninhadas, como foi necessario nesse projeto
            como é o caso do ProjetosSerializers onde recebe a api Users como aninhada para criação de contexto

        
        model = Classe do models.py que deseja serializar para DRF

        fields = recebe uma tupla com os campos que deseja exibir na APi
            * voce pode passar como '__all__' para pegar todos os campos da tabela


        


'''

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

