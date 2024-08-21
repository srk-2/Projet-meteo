from .models import Utilisateur, Capteur, CapteurData, ApiMeteo , Prediction, Alerte
from rest_framework import serializers


from rest_framework import serializers
from .models import Utilisateur

class UtilisateurSerializer(serializers.ModelSerializer):

    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Le prénom ne doit contenir que des lettres.")
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Le nom ne doit contenir que des lettres.")
        return value

    def validate_email(self, value):
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("L'email doit être au format quelquechose@gmail.com.")
        return value

    def validate_telephone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Le téléphone ne doit contenir que des chiffres.")
        return value

    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'telephone', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Utilisateur.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name'), 
            last_name=validated_data.get('last_name'),
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
        fields = ['id','utilisateur', 'libelle', 'description', 'created_at', 'is_read']