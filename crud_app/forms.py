from django import forms
from .models import *


class EmpresaForm(forms.ModelForm):
    class Meta:
        model = Empresas 
        fields = ("empresa","cod_projeto" "safegold_ger","cnpj")
        widgets = {
            'empresa': forms.TextInput(attrs={'placeholder': 'Nome da Empresa', 'autofocus': True}),
            'safegold_ger': forms.NumberInput(attrs={'placeholder': 'safegold_ger'}),
            'cod_projeto': forms.NumberInput(),
            'cnpj': forms.NumberInput(attrs={'placeholder': 'CNPJ'}),
        }

    # def __init__(self, *args, **kwargs):
    #     super(EmpresaForm, self).__init__(*args, **kwargs)
    #     for field_name, field in self.fields.items():
    #         field.widget.attrs['class'] = 'form-control'
            