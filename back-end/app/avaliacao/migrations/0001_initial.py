# Generated by Django 4.1.1 on 2023-07-28 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthUserPermissions',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('financeiro', models.IntegerField(blank=True, null=True)),
                ('avaliacao', models.IntegerField(blank=True, null=True)),
                ('is_head', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Permissionamentos por usuario',
                'db_table': 'auth_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RhClassificacaoComp',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('classificacao', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Classificação Comportamental',
                'db_table': 'rh_classificacao_comp',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RhFactComportamental',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('indicador', models.CharField(blank=True, max_length=255, null=True)),
                ('competencia', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Competencias de indicadores',
                'db_table': 'rh_fact_comportamental',
                'managed': False,
            },
        ),
    ]
