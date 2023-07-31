# Create your tests here.
#%%
import requests

# substitua as credenciais de usuário abaixo
username = 'admin@admin.com'
password = 'adminSafegold@2023Software'


# faça uma requisição POST para obter um token de autenticação
response = requests.post('https://safegold.pythonanywhere.com/api/login/', data={'username': username, 'password': password})
token = response.json()['token']
# faça uma solicitação GET para acessar uma API protegida
headers = {'Authorization': f'Token {token}'}
response = requests.get('http://127.0.0.1:8000/api/matriz_analitica_fornecedor/', headers=headers)
print(response.json())

