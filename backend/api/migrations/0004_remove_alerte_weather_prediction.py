# Generated by Django 5.0.7 on 2024-08-07 13:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_meteodata_alter_utilisateur_groups_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alerte',
            name='weather_prediction',
        ),
    ]