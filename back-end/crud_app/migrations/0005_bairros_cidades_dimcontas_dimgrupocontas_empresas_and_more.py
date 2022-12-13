# Generated by Django 4.1.1 on 2022-10-24 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud_app', '0004_alter_conta_table_alter_fornecedor_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bairros',
            fields=[
                ('id_bairro', models.AutoField(primary_key=True, serialize=False)),
                ('cod_bairro', models.CharField(max_length=10)),
                ('bairro', models.CharField(max_length=255)),
                ('uf', models.CharField(max_length=2)),
            ],
            options={
                'db_table': 'bairros',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Cidades',
            fields=[
                ('cod_cidade', models.AutoField(primary_key=True, serialize=False)),
                ('cod_ibge', models.IntegerField()),
                ('cidade', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'cidades',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Dimcontas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('desc_conta', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'dimcontas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Dimgrupocontas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('desc_grupo_conta', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'dimgrupocontas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Empresas',
            fields=[
                ('cod_empresa', models.BigAutoField(primary_key=True, serialize=False)),
                ('empresa', models.CharField(blank=True, max_length=255, null=True)),
                ('data_cadastro', models.DateTimeField()),
                ('data_atualiza', models.DateTimeField()),
                ('safegold_ger', models.IntegerField(blank=True, null=True)),
                ('cnpj', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'empresas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estados',
            fields=[
                ('cod_estado', models.IntegerField()),
                ('cod_uf', models.IntegerField()),
                ('estado', models.CharField(max_length=50)),
                ('uf', models.CharField(max_length=2, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'estados',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MatrizContaFornecedor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_fornecedor', models.BigIntegerField()),
                ('desc_fornecedor', models.CharField(max_length=255)),
                ('data_importacao', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'matriz_conta_fornecedor',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('cod_pais', models.BigAutoField(primary_key=True, serialize=False)),
                ('pais', models.CharField(blank=True, max_length=60, null=True)),
                ('pais_pt', models.CharField(blank=True, max_length=60, null=True)),
                ('sigla', models.CharField(blank=True, max_length=2, null=True)),
                ('bacen', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'pais',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Projetos',
            fields=[
                ('cod_projeto', models.BigAutoField(primary_key=True, serialize=False)),
                ('projeto', models.CharField(blank=True, max_length=255, null=True)),
                ('chave_integracao', models.CharField(blank=True, max_length=255, null=True)),
                ('cod_usuario', models.IntegerField(blank=True, null=True)),
                ('chave_inteligente', models.CharField(blank=True, max_length=255, null=True)),
                ('cod_segmento', models.IntegerField(blank=True, null=True)),
                ('ativo', models.IntegerField(blank=True, null=True)),
                ('cor', models.CharField(blank=True, max_length=255, null=True)),
                ('avatar_nome_arq', models.CharField(blank=True, max_length=255, null=True)),
                ('avatar_tipo', models.CharField(blank=True, max_length=255, null=True)),
                ('avatar_tamanho', models.BigIntegerField(blank=True, null=True)),
                ('avatar_atualizacao', models.DateTimeField(blank=True, null=True)),
                ('tipo_endereco', models.CharField(blank=True, max_length=255, null=True)),
                ('endereco', models.CharField(blank=True, max_length=255, null=True)),
                ('end_numero', models.CharField(blank=True, max_length=255, null=True)),
                ('end_compl', models.CharField(blank=True, max_length=255, null=True)),
                ('bairro', models.CharField(blank=True, max_length=255, null=True)),
                ('cep', models.CharField(blank=True, max_length=255, null=True)),
                ('data_fecha', models.DateField(blank=True, null=True)),
                ('id_importacao', models.IntegerField(blank=True, null=True)),
                ('end_cidade', models.CharField(blank=True, max_length=255, null=True)),
                ('cidade', models.CharField(blank=True, max_length=255, null=True)),
                ('resp_email', models.CharField(blank=True, max_length=255, null=True)),
                ('resp_nome', models.CharField(blank=True, max_length=255, null=True)),
                ('resp_cod', models.CharField(blank=True, max_length=255, null=True)),
                ('job_state', models.CharField(blank=True, max_length=255, null=True)),
                ('job_report', models.TextField(blank=True, null=True)),
                ('job_id', models.IntegerField(blank=True, null=True)),
                ('data_criacao', models.DateTimeField()),
                ('data_atualiza', models.DateTimeField()),
                ('legacy_id', models.IntegerField(blank=True, null=True)),
                ('safegold_ger', models.IntegerField(blank=True, null=True)),
                ('cod_sub_segmento', models.IntegerField(blank=True, null=True)),
                ('sandbox', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'projetos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Regioes',
            fields=[
                ('cod_regiao', models.AutoField(primary_key=True, serialize=False)),
                ('regiao', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'regioes',
                'managed': False,
            },
        ),
    ]