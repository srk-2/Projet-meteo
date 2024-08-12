from .models import Utilisateur, Capteur, CapteurData, ApiMeteo , Prediction , Alerte
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
    


class CapteurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capteur
        fields = ['id', 'nomcapteur', 'statut', 'type_capteur', 'localisation', 'date_installation']


class CapteurDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapteurData
        fields = ['id', 'capteur', 'timestamp', 'type_donnees', 'valeur']
        


class ApiMeteoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiMeteo
        fields = ['id', 'source', 'timestamp', 'relative_humidity', 'air_temperature', 'solar_radiation', 
                  'precipitation', 'wind_speed', 'wind_direction', 'soil_temperature', 'soil_humidity']
        

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ['id', 'timestamp', 'location', 'predicted_values', 'model_used']


class AlerteSerializer(serializers.ModelSerializer):
    utilisateur = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Alerte
        fields = ['utilisateur', 'libelle', 'description', 'created_at', 'is_read']