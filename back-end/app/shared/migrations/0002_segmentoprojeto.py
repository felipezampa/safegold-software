# Generated by Django 4.1.1 on 2023-07-28 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SegmentoProjeto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('segmento', models.CharField(blank=True, max_length=30, null=True)),
            ],
            options={
                'verbose_name_plural': 'Segmentos',
                'db_table': 'segmento_projeto',
                'managed': False,
            },
        ),
    ]
