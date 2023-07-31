from .models import *
from rest_framework import serializers
'''
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

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


# class ProjetosSerializer(serializers.ModelSerializer):
#     id_user = UserSerializer(read_only= True, many=True)
#     class Meta:
#         model = Projetos
#         fields = ('cod_projeto','projeto','ativo','safegold_ger','data_criacao','data_atualiza','id_user')


class ProjetoUserSerializer(serializers.ModelSerializer):
    cod_projeto = serializers.PrimaryKeyRelatedField(queryset=Projetos.objects.all())
    id_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    projeto = serializers.StringRelatedField(source='cod_projeto.projeto')
    username = serializers.StringRelatedField(source='id_user.username')



    class Meta:
        model = ProjetoUser
        fields = ('id','id_user','username','cod_projeto','projeto')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ProjetosSerializer(serializers.ModelSerializer):
    id_user = UserSerializer(read_only= True, many=True)

    class Meta:
        model = Projetos
        fields = ('cod_projeto','projeto','ativo','cod_segmento','ativo','cep','cidade','data_cadastro','data_atualiza','id_user')


class EmpresasSerializer(serializers.ModelSerializer):
    # projetouser = ProjetoUserSerializer()
    # projeto = serializers.StringRelatedField(source='cod_projeto.projeto')
    # ativo = serializers.StringRelatedField(source='cod_projeto.ativo')
    # id_user = serializers.StringRelatedField(source='cod_projeto.id_user', many=True, read_only=True)
    # id_user_id = serializers.StringRelatedField(source='cod_projeto.id_user.id')


    class Meta:
        model = Empresas
        fields = '__all__'

    # def create(self, validated_data):
    #     projetouser_data = validated_data.pop('projetouser')  # Handle nested data during creation
    #     empresa = Empresas.objects.create(**validated_data)
    #     ProjetoUser.objects.create(empresa=empresa, **projetouser_data)
    #     return empresa