from rest_framework import serializers
from .models import *

'''
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

class AuthUserPermissionsSerializers(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source='id_user.username')
    nome_cargo = serializers.StringRelatedField(source='idrh_cargo.nome_cargo')
    class Meta:
        model = AuthUserPermissions
        fields = 'id','id_user', 'username', 'financeiro','avaliacao', 'is_head', 'idrh_cargo','nome_cargo'
