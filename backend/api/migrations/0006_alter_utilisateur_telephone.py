# Generated by Django 5.0.7 on 2024-08-23 20:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_apimeteo_prediction_remove_weatherdata_automate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='utilisateur',
            name='telephone',
            field=models.CharField(blank=True, max_length=15, null=True, validators=[django.core.validators.RegexValidator(message="Le numéro de téléphone doit être au format: '+999999999'. Jusqu'à 15 chiffres autorisés.", regex='^\\+?1?\\d{8,15}$')]),
        ),
    ]
