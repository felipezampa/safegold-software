from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class TestApiLogin(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('api_login')
        self.username = 'user'
        self.password = 'pass'
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_api_login(self):
        response = self.client.post(self.url, {'username': self.username, 'password': self.password})
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.json())
        token_key = response.json()['token']
        token = Token.objects.get(key=token_key)
        self.assertEqual(token.user, self.user)
