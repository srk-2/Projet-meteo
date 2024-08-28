import requests
from django.utils import timezone
from django.core.management.base import BaseCommand
from datetime import timedelta
from api.models import Alerte, Utilisateur

class Command(BaseCommand):
    help = "Envoie des alertes météo quotidiennes et supprime celles de la veille."

    def handle(self, *args, **kwargs):
        latitude = 6.385992
        longitude = 1.243624

        api_key_owm = '86979e78b0ef32cc147c5570459b9098'
        url_owm = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&units=metric&lang=fr&appid={api_key_owm}"
        response_owm = requests.get(url_owm)
        weather_data = response_owm.json()
        description_ciel = weather_data['weather'][0]['description']

        url_om = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=GMT"
        response_om = requests.get(url_om)
        meteo_data = response_om.json()
        temp_max = meteo_data['daily']['temperature_2m_max'][0]
        temp_min = meteo_data['daily']['temperature_2m_min'][0]

        # Créer l'alerte pour chaque utilisateur
        utilisateurs = Utilisateur.objects.all()
        for utilisateur in utilisateurs:
            Alerte.objects.create(
                utilisateur=utilisateur,
                libelle="Alerte Météo",
                description=f"Prévisions pour aujourd'hui : {description_ciel}, Température min : {temp_min}°, Température max : {temp_max}°."
            )

        # Supprimer les alertes de la veille
        yesterday = timezone.now() - timedelta(days=1)
        Alerte.objects.filter(created_at__lt=yesterday).delete()

        self.stdout.write(self.style.SUCCESS('Alertes envoyées et anciennes alertes supprimées.'))
