from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from .models import Fornecedor

class ContaForm(forms.Form):
    conta = forms.CharField(label='Conta', max_length=255)
    fornecedor = forms.ChoiceField(choices=Fornecedor.nome)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_id = 'id-exampleForm'
        self.helper.form_class = 'blueForms'
        self.helper.form_method = 'post'
        self.helper.form_action = 'submit_survey'

        self.helper.add_input(Submit('submit', 'Submit'))