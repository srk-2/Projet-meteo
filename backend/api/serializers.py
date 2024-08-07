from .models import Utilisateur , TypeDeCapteur , Capteur, CapteurData, Automate, WeatherData, MeteoData, WeatherPrediction, Alerte
from rest_framework import serializers


class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'telephone', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Utilisateur.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            telephone=validated_data.get('telephone')
        )
        return user
    
class TypeDeCapteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeDeCapteur
        fields = ['id', 'libelle', 'description']


class CapteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capteur
        fields = ['id', 'type', 'nomcapteur', 'status']


class CapteurDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapteurData
        fields = ['id', 'capteur', 'timestamp', 'air_temperature', 
                  'relative_humidity', 'precipitation', 'wind', 'solar_radiation',
                    'soil_temperature', 'soil_moisture', 'dew_point']
        

class AutomateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Automate
        fields = ['id', 'nomautomate', 'description', 'installation_date', 'is_active']


class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = ['id', 'automate', 'timestamp', 'air_temperature',
                   'relative_humidity', 'precipitation', 'wind', 'solar_radiation', 
                   'soil_temperature', 'soil_moisture', 'dew_point']


class MeteoDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeteoData
        fields = ['id', 'timestamp', 'air_temperature', 'relative_humidity',
                   'precipitation', 'wind', 'solar_radiation', 'soil_temperature', 
                   'soil_moisture', 'dew_point']


class WeatherPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherPrediction
        fields = ['id', 'weather_data', 'meteo_data', 'timestamp', 
                  'predicted_values', 'model_used', 'created_at']


class AlerteSerializer(serializers.ModelSerializer):
    utilisateur = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Alerte
        fields = ['utilisateur', 'libellealerte', 'descriptionalerte', 'created_at', 'is_read']