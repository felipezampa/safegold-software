from . import models as auth_models
from rest_framework import viewsets
from . import serializers
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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



# AVALIAÇÃO DE DESEMPENHO, MODULO RH

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class AuthUserPermissionsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = auth_models.AuthUserPermissions.objects.all()
    serializer_class = serializers.AuthUserPermissionsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','id_user', 'financeiro','avaliacao', 'is_head']
    


@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key})
    else:
        return JsonResponse({'error': 'Invalid credentials'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_userlogin(request):
    user = request.user
    try:
            auth = auth_models.AuthUserPermissions.objects.get(id_user=user.pk)

            financeiro = auth.financeiro
            avaliacao = auth.avaliacao
            head_de_area = auth.is_head


    except auth_models.AuthUserPermissions.DoesNotExist:
            # Se o objeto AuthUserPermissions não existir, define todas as variáveis ​​como zero ou "Sem cargo vinculado"
            financeiro = avaliacao = head_de_area = 0

    serialized_user = {
        'id_user': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'financeiro': financeiro,
        'avaliacao': avaliacao,
        'head_de_area': head_de_area,
        'superuser': user.is_superuser,
        'token': request.auth.key
    }
    return JsonResponse(serialized_user)
