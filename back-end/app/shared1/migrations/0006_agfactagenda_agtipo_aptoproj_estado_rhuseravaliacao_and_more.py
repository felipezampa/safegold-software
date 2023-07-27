# Generated by Django 4.1.1 on 2023-07-27 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0005_authuserpermissions_rhcargo_rhclassificacaocomp_and_more'),
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
                'db_table': 'ag_tipo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AptoProj',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('story_id', models.CharField(blank=True, max_length=4, null=True)),
                ('data_apto', models.DateField(blank=True, null=True)),
                ('vlr_apto', models.DecimalField(blank=True, decimal_places=65535, max_digits=65535, null=True)),
            ],
            options={
                'verbose_name_plural': 'Apontamento Gestor',
                'db_table': 'apto_proj',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estado',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(blank=True, max_length=60, null=True)),
                ('uf', models.CharField(blank=True, max_length=2, null=True)),
            ],
            options={
                'db_table': 'estado',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RhUserAvaliacao',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name_plural': 'Avaliação Comportamental - Avaliado (MANUTENÇÃO)',
                'db_table': 'rh_user_avaliacao',
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
                'db_table': 'sg_area',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgAvaliador',
            fields=[
                ('id_avaliador', models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'sg_avaliador',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SgAvaliadorGestor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'sg_avaliador_gestor',
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
                'db_table': 'sg_unidade_negocio',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Bairros',
        ),
        migrations.DeleteModel(
            name='Cidades',
        ),
        migrations.DeleteModel(
            name='Dimcontas',
        ),
        migrations.DeleteModel(
            name='Dimgrupocontas',
        ),
        migrations.DeleteModel(
            name='Estados',
        ),
        migrations.DeleteModel(
            name='FinContaAnalitica',
        ),
        migrations.DeleteModel(
            name='FinGrupoContas',
        ),
        migrations.DeleteModel(
            name='FinSubgrupoContas',
        ),
        migrations.DeleteModel(
            name='Fornecedor',
        ),
        migrations.DeleteModel(
            name='MatrizAnaliticaFornecedor',
        ),
        migrations.DeleteModel(
            name='Pais',
        ),
        migrations.DeleteModel(
            name='Regioes',
        ),
        migrations.DeleteModel(
            name='RhCargo',
        ),
        migrations.DeleteModel(
            name='RhFactCargoMetas',
        ),
        migrations.DeleteModel(
            name='RhMapCargoComp',
        ),
        migrations.AlterModelOptions(
            name='authuserpermissions',
            options={'managed': False, 'verbose_name_plural': 'Permissionamentos por usuario'},
        ),
        migrations.AlterModelOptions(
            name='projetos',
            options={'managed': False, 'verbose_name_plural': 'Projetos'},
        ),
        migrations.AlterModelOptions(
            name='rhclassificacaocomp',
            options={'managed': False, 'verbose_name_plural': 'Classificação Comportamental'},
        ),
        migrations.AlterModelOptions(
            name='rhfactcomportamental',
            options={'managed': False, 'verbose_name_plural': 'Competencias de indicadores'},
        ),
    ]
