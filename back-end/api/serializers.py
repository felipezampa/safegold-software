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







'''

    Autenticação JWT (JSON Web Token)
        - JWT é usado para criar tokens de acesso a um app
        - O servidor gera um token que certifica a identidade do usuário e o envia ao cliente

        Instale o pacote do django-rest-framework-simplejwt:

          '  pip instalar djangorestframework-simplejwt  '

        
        adicione ao settings.py 
        
            REST_FRAMEWORK = {
                'DEFAULT_AUTHENTICATION_CLASSES': [
                    'rest_framework_simplejwt.authentication.JWTAuthentication',
                ],
            }
        


    referencia = https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8


'''
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         return token
