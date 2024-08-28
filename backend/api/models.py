from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from .managers import UtilisateurManager
from django.conf import settings
from django.utils import timezone

class Utilisateur(AbstractUser):
    telephone = models.CharField(
        max_length=15, 
        null=True, 
        blank=True, 
        validators=[RegexValidator(
            regex=r'^\+?1?\d{8,15}$',
            message="Le numéro de téléphone doit être au format: '+999999999'. Jusqu'à 15 chiffres autorisés."
        )]
    )
    is_admin = models.BooleanField(default=False)
   

    objects = UtilisateurManager()

    class Meta:
        verbose_name_plural = "Utilisateurs"

    groups = models.ManyToManyField(
        Group,
        related_name='utilisateurs',  
        blank=True,
        related_query_name='utilisateur',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='utilisateurs', 
        blank=True,
        related_query_name='utilisateur',
    )

    def clean(self):
        if not self.first_name.isalpha():
            raise ValidationError('Le prénom ne doit contenir que des lettres.')
        if not self.last_name.isalpha():
            raise ValidationError('Le nom ne doit contenir que des lettres.')
        if not self.email.endswith('@gmail.com'):
            raise ValidationError("L'email doit être au format quelquechose@gmail.com")

class Capteur(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Maintenance'),
    ]

    nomcapteur = models.CharField(max_length=100)
    statut = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    type_capteur = models.CharField(max_length=100, null=True, blank=True)
    localisation = models.CharField(max_length=255 , null=True, blank=True)
    date_installation = models.DateField(default=timezone.now)


class CapteurData(models.Model):
    TYPE_DONNEES_CHOICES = [
        ('humidity', 'Humidité'),
        ('temperature', 'Température de l\'air'),
        ('solar_radiation', 'Rayonnement solaire'),
        ('precipitation', 'Précipitation'),
        ('wind_speed', 'Vitesse du vent'),
        ('wind_direction', 'Direction du vent'),
        ('soil_temperature', 'Température du sol'),
        ('soil_humidity', 'Humidité du sol'),
    ]

    capteur = models.ForeignKey(Capteur, on_delete=models.CASCADE, related_name='data')
    timestamp = models.DateTimeField()
    type_donnees = models.CharField(max_length=50, choices=TYPE_DONNEES_CHOICES, null=True, blank=True)
    valeur = models.FloatField(null=True, blank=True)


class ApiMeteo(models.Model):
     source = models.CharField(max_length=100, null=True, blank=True)
     timestamp = models.DateTimeField()
     relative_humidity = models.FloatField(null=True, blank=True)
     air_temperature = models.FloatField(null=True, blank=True)
     solar_radiation = models.FloatField(null=True, blank=True)
     precipitation = models.FloatField(null=True, blank=True)
     wind_speed = models.FloatField(null=True, blank=True)
     wind_direction = models.CharField(max_length=50, null=True, blank=True)
     soil_temperature = models.FloatField(null=True, blank=True)
     soil_humidity = models.FloatField(null=True, blank=True)



class Prediction(models.Model):
    timestamp = models.DateTimeField()
    location = models.CharField(max_length=255, null=True, blank=True)
    predicted_values = models.JSONField(null=True, blank=True)
    model_used = models.CharField(max_length=100, null=True, blank=True)

    

class Alerte(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    libelle = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
