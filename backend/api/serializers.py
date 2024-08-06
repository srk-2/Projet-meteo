# api/serializers.py
from .models import Utilisateur
from .models import TypeDeCapteur
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