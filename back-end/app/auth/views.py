from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from . import models as auth_models
from . import serializers as auth_serializers



@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class AuthUserPermissionsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = auth_models.AuthUserPermissions.objects.all()
    serializer_class = auth_serializers.AuthUserPermissionsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','id_user', 'financeiro','avaliacao', 'is_head']
    

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def update_password(request):
    user = request.user

    if request.method == 'PATCH':
        serializer = auth_serializers.ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.data.get("old_password")

            if not user.check_password(old_password):
                return JsonResponse({"error": "Wrong password."}, status=400)

            new_password = serializer.data.get("new_password")
            user.set_password(new_password)
            user.save()

            return JsonResponse({"message": "Password updated successfully"}, status=204)

        return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(['POST'])
@csrf_exempt
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