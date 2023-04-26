from rest_framework import serializers
from crud_app.models import  *
from django.contrib.auth import authenticate

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
        fields = ('cod_projeto','projeto','ativo','safegold_ger','data_criacao','data_atualiza','id_user')


class EmpresasSerializer(serializers.ModelSerializer):
    projeto = serializers.StringRelatedField(source='cod_projeto.projeto')
    ativo = serializers.StringRelatedField(source='cod_projeto.ativo')
    id_user = serializers.StringRelatedField(source='cod_projeto.id_user', many=True, read_only=True)
    id_user_id = serializers.StringRelatedField(source='cod_projeto.id_user.id')


    class Meta:
        model = Empresas
        fields = ('cod_empresa', 'empresa', 'data_cadastro', 'data_atualiza', 'safegold_ger', 'cnpj', 'cod_projeto','projeto','ativo','id_user','id_user_id')



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
            return {'error': 'Mais de um Fornecedor associado a esta Matriz Analítica.'}

class FornecedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fornecedor
        fields = '__all__'



'''
    @eduardolcordeiro


    Autenticação JWT (JSON Web Token)
        - JWT é usado para criar tokens de acesso a um app
        - O servidor gera um token que certifica a identidade do usuário e o envia ao cliente
        
        adicione ao settings.py 
        
            REST_FRAMEWORK = {
                'DEFAULT_AUTHENTICATION_CLASSES': [
                    'rest_framework_simplejwt.authentication.JWTAuthentication',
                ],
            }
        


    referencia = https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8


'''


# AVALIAÇÃO DE DESEMPENHO, MODULO RH


class AuthUserPermissionsSerializers(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source='id_user.username')
    nome_cargo = serializers.StringRelatedField(source='idrh_cargo.nome_cargo')
    class Meta:
        model = AuthUserPermissions
        fields = 'id','id_user', 'username', 'financeiro','avaliacao', 'is_head', 'idrh_cargo','nome_cargo'


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
    
# class Apto_gestorSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = AptoProj
#         fields = '__all__'







################################################################################## MODULO AGENDA ###########################################################################################################################
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

class AgFactAgendaSerializer(serializers.ModelSerializer):
    funcao_gestor = serializers.SerializerMethodField()
    tipo_nome = serializers.StringRelatedField(source='tipo.tipo')
    projeto_nome =serializers.StringRelatedField(source='projetos.projeto')
    def get_funcao_gestor(self, obj):
        funcao_gestor = SgFuncaoGestorSerializers(obj.sg_funcao_gestor).data
        return funcao_gestor

    class Meta:
        model = AgFactAgenda
        fields = 'cod_agenda','data','dia_semana','tipo','tipo_nome','projetos','projeto_nome','atendimento','horas','funcao_gestor'