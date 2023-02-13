from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Bairros)
admin.site.register(Cidades)
admin.site.register(Dimcontas)
admin.site.register(Dimgrupocontas)
admin.site.register(Empresas)
admin.site.register(Estados)
admin.site.register(Pais)
admin.site.register(Projetos)
admin.site.register(Regioes)
admin.site.register(ProjetoUser)



# Plano de contas
admin.site.register(FinGrupoContas)
admin.site.register(FinContaAnalitica)
admin.site.register(FinSubgrupoContas)
admin.site.register(MatrizAnaliticaFornecedor)

admin.site.register(Fornecedor)

