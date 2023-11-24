from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_filters.rest_framework import DjangoFilterBackend
from . import models 
from sg_software import settings
from rest_framework import serializers, viewsets

from .models import LandingPage


# Create your views here.
class LandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LandingPage
        fields = '__all__'
        # read_only_fields = ('origem',)

class LandingPageViewSet(viewsets.ModelViewSet):
    queryset = models.LandingPage.objects.all()
    serializer_class = LandingPageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','nome','email','telefone','faturamento','cargo','segmento_empresa','origem']

@receiver(post_save, sender=LandingPage)
def enviar_email(sender, instance, created, **kwargs):
    if (sender.origem == 'LP-AGRO'):
      if created:
          subject = 'Obrigado por cadastrar'
          message = 'Olá {},\n\nObrigado por se cadastrar em nosso site.'.format(instance.nome)
          from_email = settings.EMAIL_HOST_USER
          recipient_list = [instance.email]
          
          # Cria um objeto EmailMessage com o anexo PDF
          pdf_path = 'C:/Users/GABRIELA/Desktop/landing_page/sg-landing-page/Cepea_B3_Metodologia_Indicador_BOI_02_01_2020.pdf'
          pdf_file = open(pdf_path, 'rb')
          email = EmailMessage(subject, message, from_email, recipient_list)
          email.attach('Cepea_B3_Metodologia_Indicador_BOI_02_01_2020.pdf', pdf_file.read(), 'application/pdf')
          
          # Envia o e-mail
          email.send()