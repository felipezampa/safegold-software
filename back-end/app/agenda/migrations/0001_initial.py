# Generated by Django 4.1.1 on 2023-10-06 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AgFactAgenda',
            fields=[
                ('cod_agenda', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(blank=True, null=True)),
                ('dia_semana', models.CharField(blank=True, max_length=255, null=True)),
                ('atendimento', models.CharField(blank=True, max_length=255, null=True)),
                ('horas', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Agenda',
                'db_table': 'ag_fact_agenda',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AgTipo',
            fields=[
                ('id_tipo', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Tipo',
                'db_table': 'ag_tipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgArea',
            fields=[
                ('id_area', models.AutoField(primary_key=True, serialize=False)),
                ('area', models.CharField(blank=True, max_length=40, null=True)),
            ],
            options={
                'verbose_name_plural': 'Area',
                'db_table': 'sg_area',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgFuncao',
            fields=[
                ('id_funcao', models.AutoField(primary_key=True, serialize=False)),
                ('funcao', models.CharField(blank=True, max_length=40, null=True)),
                ('carga_horaria', models.FloatField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Funcao',
                'db_table': 'sg_funcao',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgFuncaoGestor',
            fields=[
                ('id_func_gest', models.AutoField(primary_key=True, serialize=False)),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Funcao Gestor',
                'db_table': 'sg_funcao_gestor',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgUnidadeNegocio',
            fields=[
                ('id_unidade', models.AutoField(primary_key=True, serialize=False)),
                ('unidade', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'verbose_name_plural': 'Unidade Negocio',
                'db_table': 'sg_unidade_negocio',
                'managed': False,
            },
        ),
    ]
