# Generated by Django 3.2.16 on 2022-11-04 14:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crud_app', '0008_delete_teste1'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Conta',
        ),
        migrations.DeleteModel(
            name='Fornecedor',
        ),
    ]