from rest_framework import serializers
from crud_app.models import  *
'''

    @eduardolcordeiro

    Implementaçã do ModelSerializer
        faz a serialização da tabela no models.py

        - é nela que voce pode fazer api's aninhadas, como foi necessario nesse projeto
            como é o caso do ProjetosSerializers onde recebe a api Users como aninhada para criação de contexto

        
        model = Classe do models.py que deseja serializar para DRF

        fields = recebe uma tupla com os campos que deseja exibir na APi
            * voce pode passar como '__all__' para pegar todos os campos da tabela


        
        API'S ANINHADAS:
            - instancie um objeto da tabela que vc quer aninhar a sua api "main", esse objeto tem que ser a foreign key !
                exemplo:


            class UserSerializer(serializers.ModelSerializer):
                class Meta:
                    model = User
                    fields = '__all__'


            class ProjetosSerializer(serializers.ModelSerializer):
                id_user = UserSerializer()
                class Meta:
                    model = Projetos
                    fields = ('cod_projeto','projeto','ativo','safegold_ger','id_user')


'''

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProjetosSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only= True)
    class Meta:
        model = Projetos
        fields = ('cod_projeto','projeto','ativo','safegold_ger','data_criacao','data_atualiza','id_user')


class EmpresasSerializer(serializers.ModelSerializer):
    projeto = serializers.StringRelatedField(source='cod_projeto.projeto')
    projeto_ativo = serializers.StringRelatedField(source='cod_projeto.ativo')
    id_user = serializers.StringRelatedField(source='cod_projeto.id_user.id')
    user_username = serializers.StringRelatedField(source='cod_projeto.id_user.username')
    

    cod_projeto = serializers.PrimaryKeyRelatedField(queryset=Projetos.objects.all())

    class Meta:
        model = Empresas
        fields = ('cod_empresa', 'empresa','data_cadastro','data_atualiza','safegold_ger', 'cnpj','cod_projeto','projeto','projeto_ativo','id_user','user_username' )
    
class MatrizContaFornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatrizContaFornecedor
        fields = '__all__'


class DimcontasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimcontas
        fields = '__all__'







'''
    @eduardolcordeiro


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
