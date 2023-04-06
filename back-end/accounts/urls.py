from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
#from .views import current_user
from accounts import views


urlpatterns = [
    # path('profile/', views.ProfileView.as_view()),
    # path('api/auth/', views.CustomAuthToken.as_view()),
    #path('api/login/', views.LoginView.as_view()),
    # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    # path('current_user/', current_user),
    


]

urlpatterns = format_suffix_patterns(urlpatterns)


