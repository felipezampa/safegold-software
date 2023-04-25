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


# Matriz Fornecedor
admin.site.register(MatrizAnaliticaFornecedor)

admin.site.register(Fornecedor)



# RH AVALIAÇÃO DE DESEMPENHO

# admin.site.register(AuthUserPermissions)
# admin.site.register(RhClassificacaoComp)
# admin.site.register(RhFactCargoMetas)
# admin.site.register(RhFactComportamental)
# admin.site.register(RhMapCargoComp)
# admin.site.register(RhUserAvaliacao)



#AGENDA
admin.site.register(SgArea)
admin.site.register(SgAvaliador)
admin.site.register(SgAvaliadorGestor)
admin.site.register(SgFuncao)
admin.site.register(SgFuncaoGestor)
admin.site.register(SgUnidadeNegocio)
admin.site.register(AgFactAgenda)
admin.site.register(AgTipo)



