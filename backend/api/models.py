from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from .managers import UtilisateurManager

class Utilisateur(AbstractUser):
    telephone = models.CharField(max_length=15, null=True, blank=True)
    is_admin = models.BooleanField(default=False)

    objects = UtilisateurManager()

    class Meta:
        verbose_name_plural = "Utilisateurs"

    groups = models.ManyToManyField(
        Group,
        related_name='utilisateurs',  
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='utilisateur',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='utilisateurs', 
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='utilisateur',
    )

class TypeDeCapteur(models.Model):
    libelle = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.libelle


class Capteur(models.Model):
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Maintenance'),
    ]

    type = models.ForeignKey(TypeDeCapteur, on_delete=models.CASCADE)
    nomcapteur = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')


class CapteurData(models.Model):
    capteur = models.ForeignKey(Capteur, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    air_temperature = models.FloatField(null=True, blank=True)  # Température de l'air
    relative_humidity = models.FloatField(null=True, blank=True)  # Humidité relative
    precipitation = models.FloatField(null=True, blank=True)  # Précipitations
    wind = models.FloatField(null=True, blank=True)  # Vitesse du vent
    solar_radiation = models.FloatField(null=True, blank=True)  # Rayonnement solaire
    soil_temperature = models.FloatField(null=True, blank=True)  # Température du sol
    soil_moisture = models.FloatField(null=True, blank=True)  # Humidité du sol
    dew_point = models.FloatField(null=True, blank=True)  # Point de rosée

class Automate(models.Model):
    nomautomate = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    installation_date = models.DateField()
    is_active = models.BooleanField(default=True)

class WeatherData(models.Model):
    automate = models.ForeignKey(Automate, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    air_temperature = models.FloatField(null=True, blank=True)
    relative_humidity = models.FloatField(null=True, blank=True)
    precipitation = models.FloatField(null=True, blank=True)
    wind = models.FloatField(null=True, blank=True)
    solar_radiation = models.FloatField(null=True, blank=True)
    soil_temperature = models.FloatField(null=True, blank=True)
    soil_moisture = models.FloatField(null=True, blank=True)
    dew_point = models.FloatField(null=True, blank=True)


#class MeteoData(models.Model):
#    timestamp = models.DateTimeField()
#    air_temperature = models.FloatField(null=True, blank=True)
#    relative_humidity = models.FloatField(null=True, blank=True)
#    precipitation = models.FloatField(null=True, blank=True)
#    wind = models.FloatField(null=True, blank=True)
#    solar_radiation = models.FloatField(null=True, blank=True)
#    soil_temperature = models.FloatField(null=True, blank=True)
#    soil_moisture = models.FloatField(null=True, blank=True)
#    dew_point = models.FloatField(null=True, blank=True)


#class WeatherPrediction(models.Model):
#    weather_data = models.ForeignKey(WeatherData, on_delete=models.CASCADE)
#    meteo_data = models.ForeignKey(MeteoData, on_delete=models.CASCADE)
#    timestamp = models.DateTimeField()
#    predicted_values = models.TextField()
#    model_used = models.CharField(max_length=100)
#    created_at = models.DateTimeField(auto_now_add=True)

#class Alerte(models.Model):
#    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
#    weather_prediction = models.ForeignKey(WeatherPrediction, on_delete=models.CASCADE)
#    alert_type = models.CharField(max_length=50)
#    message = models.TextField()
#    created_at = models.DateTimeField(auto_now_add=True)
#    is_read = models.BooleanField(default=False)
