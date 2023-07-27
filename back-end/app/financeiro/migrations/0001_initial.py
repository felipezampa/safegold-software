# Generated by Django 4.1.1 on 2023-07-27 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FinContaAnalitica',
            fields=[
                ('cod_conta_analitica', models.AutoField(primary_key=True, serialize=False)),
                ('desc_conta', models.CharField(blank=True, max_length=300, null=True)),
            ],
            options={
                'verbose_name_plural': 'Analitico // Plano de Contas',
                'db_table': 'fin_conta_analitica',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FinGrupoContas',
            fields=[
                ('cod_grupo_contas', models.IntegerField(primary_key=True, serialize=False)),
                ('desc_grupo_contas', models.CharField(blank=True, max_length=300, null=True)),
                ('permite_vinculo', models.CharField(blank=True, max_length=3, null=True)),
                ('sumario', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Grupo de Contas // Plano de Contas',
                'db_table': 'fin_grupo_contas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FinSubgrupoContas',
            fields=[
                ('cod_subgrupo_contas', models.IntegerField(primary_key=True, serialize=False)),
                ('desc_subgrupo_contas', models.CharField(blank=True, max_length=300, null=True)),
            ],
            options={
                'verbose_name_plural': 'SubgrupoContas // Plano de Contas',
                'db_table': 'fin_subgrupo_contas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Fornecedor',
            fields=[
                ('cod_empresa', models.BigIntegerField(blank=True, null=True)),
                ('cnpj', models.CharField(blank=True, max_length=255, null=True)),
                ('empresa', models.CharField(blank=True, max_length=255, null=True)),
                ('id_fornecedor', models.CharField(blank=True, max_length=255, null=True)),
                ('matriz', models.CharField(blank=True, max_length=255, null=True)),
                ('fornecedor', models.CharField(blank=True, max_length=255, null=True)),
                ('cod_fornecedor', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name_plural': 'Fornecedor',
                'db_table': 'fornecedores_geral',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MatrizAnaliticaFornecedor',
            fields=[
                ('cod_matriz_analitica_fornecedor', models.AutoField(primary_key=True, serialize=False)),
                ('vinculo', models.IntegerField(blank=True, default=0, null=True)),
                ('fornecedor', models.CharField(blank=True, max_length=255, null=True)),
                ('cnpj', models.CharField(blank=True, max_length=255, null=True)),
                ('empresa', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'verbose_name_plural': 'Vinculo de Fornecedor á Conta Analitica',
                'db_table': 'matriz_analitica_fornecedor',
                'managed': False,
            },
        ),
    ]
