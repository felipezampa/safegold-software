from django.contrib import admin
from .models import *

# Register your models here.

# Plano de contas
admin.site.register(FinGrupoContas)
admin.site.register(FinContaAnalitica)
admin.site.register(FinSubgrupoContas)


# Matriz Fornecedor
admin.site.register(MatrizAnaliticaFornecedor)
admin.site.register(Fornecedor)