from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Utilisateur , TypeDeCapteur, Capteur, CapteurData, Automate, WeatherData, MeteoData, WeatherPrediction, Alerte
from .serializers import UtilisateurSerializer, TypeDeCapteurSerializer , CapteurSerializer, CapteurDataSerializer, AutomateSerializer, WeatherDataSerializer, MeteoDataSerializer, WeatherPredictionSerializer, AlerteSerializer
from django.contrib.auth import get_user_model


class CreateUtilisateurView(generics.CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]
    

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'telephone': user.telephone,
            'is_admin': user.is_admin
        }
        return Response(data)

    
class UtilisateurListView(generics.ListAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]

class UtilisateurDetailView(generics.RetrieveAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]

class UtilisateurDeleteView(generics.DestroyAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]

class UtilisateurUpdateView(generics.UpdateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]


class TypeDeCapteurListCreateView(generics.ListCreateAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [IsAuthenticated]

class TypeDeCapteurDetailView(generics.RetrieveAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]

class TypeDeCapteurDeleteView(generics.DestroyAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]

class TypeDeCapteurUpdateView(generics.UpdateAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]


class CapteurListCreateView(generics.ListCreateAPIView):
    queryset = Capteur.objects.all()
    serializer_class = CapteurSerializer
    permission_classes = [AllowAny]

class CapteurDetailView(generics.RetrieveAPIView):
    queryset = Capteur.objects.all()
    serializer_class = CapteurSerializer
    permission_classes = [AllowAny]

class CapteurDeleteView(generics.DestroyAPIView):
    queryset = Capteur.objects.all()
    serializer_class = CapteurSerializer
    permission_classes = [AllowAny]

class CapteurUpdateView(generics.UpdateAPIView):
    queryset = Capteur.objects.all()
    serializer_class = CapteurSerializer
    permission_classes = [AllowAny]


class CapteurDataListCreateView(generics.ListCreateAPIView):
    queryset = CapteurData.objects.all()
    serializer_class = CapteurDataSerializer
    permission_classes = [AllowAny]

class CapteurDataDetailView(generics.RetrieveAPIView):
    queryset = CapteurData.objects.all()
    serializer_class = CapteurDataSerializer
    permission_classes = [AllowAny]

class CapteurDataDeleteView(generics.DestroyAPIView):
    queryset = CapteurData.objects.all()
    serializer_class = CapteurDataSerializer
    permission_classes = [AllowAny]

class CapteurDataUpdateView(generics.UpdateAPIView):
    queryset = CapteurData.objects.all()
    serializer_class = CapteurDataSerializer
    permission_classes = [AllowAny]


class AutomateListCreateView(generics.ListCreateAPIView):
    queryset = Automate.objects.all()
    serializer_class = AutomateSerializer
    permission_classes = [AllowAny]

class AutomateDetailView(generics.RetrieveAPIView):
    queryset = Automate.objects.all()
    serializer_class = AutomateSerializer
    permission_classes = [AllowAny]

class AutomateDeleteView(generics.DestroyAPIView):
    queryset = Automate.objects.all()
    serializer_class = AutomateSerializer
    permission_classes = [AllowAny]

class AutomateUpdateView(generics.UpdateAPIView):
    queryset = Automate.objects.all()
    serializer_class = AutomateSerializer
    permission_classes = [AllowAny]


class WeatherDataListCreateView(generics.ListCreateAPIView):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer
    permission_classes = [AllowAny]

class WeatherDataDetailView(generics.RetrieveAPIView):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer
    permission_classes = [AllowAny]

class WeatherDataDeleteView(generics.DestroyAPIView):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer
    permission_classes = [AllowAny]

class WeatherDataUpdateView(generics.UpdateAPIView):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer
    permission_classes = [AllowAny]


class MeteoDataListCreateView(generics.ListCreateAPIView):
    queryset = MeteoData.objects.all()
    serializer_class = MeteoDataSerializer
    permission_classes = [AllowAny]

class MeteoDataDetailView(generics.RetrieveAPIView):
    queryset = MeteoData.objects.all()
    serializer_class = MeteoDataSerializer
    permission_classes = [AllowAny]

class MeteoDataDeleteView(generics.DestroyAPIView):
    queryset = MeteoData.objects.all()
    serializer_class = MeteoDataSerializer
    permission_classes = [AllowAny]

class MeteoDataUpdateView(generics.UpdateAPIView):
    queryset = MeteoData.objects.all()
    serializer_class = MeteoDataSerializer
    permission_classes = [AllowAny]


class WeatherPredictionListCreateView(generics.ListCreateAPIView):
    queryset = WeatherPrediction.objects.all()
    serializer_class = WeatherPredictionSerializer
    permission_classes = [AllowAny]

class WeatherPredictionDetailView(generics.RetrieveAPIView):
    queryset = WeatherPrediction.objects.all()
    serializer_class = WeatherPredictionSerializer
    permission_classes = [AllowAny]

class WeatherPredictionDeleteView(generics.DestroyAPIView):
    queryset = WeatherPrediction.objects.all()
    serializer_class = WeatherPredictionSerializer
    permission_classes = [AllowAny]

class WeatherPredictionUpdateView(generics.UpdateAPIView):
    queryset = WeatherPrediction.objects.all()
    serializer_class = WeatherPredictionSerializer
    permission_classes = [AllowAny]



User = get_user_model()

class AlerteListCreateView(generics.ListCreateAPIView):
    queryset = Alerte.objects.all()
    serializer_class = AlerteSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        utilisateurs = User.objects.all()

        alertes = []
        for utilisateur in utilisateurs:
            alertes.append(Alerte(
                utilisateur=utilisateur,
                libellealerte=serializer.validated_data['libellealerte'],
                descriptionalerte=serializer.validated_data['descriptionalerte']
            ))
        
        Alerte.objects.bulk_create(alertes)

class AlerteListView(generics.ListAPIView):
    serializer_class = AlerteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Alerte.objects.filter(utilisateur=user)
    

class AlerteDetailView(generics.RetrieveAPIView):
    queryset = Alerte.objects.all()
    serializer_class = AlerteSerializer
    permission_classes = [AllowAny]

class AlerteDeleteView(generics.DestroyAPIView):
    queryset = Alerte.objects.all()
    serializer_class = AlerteSerializer
    permission_classes = [AllowAny]

class AlerteUpdateView(generics.UpdateAPIView):
    queryset = Alerte.objects.all()
    serializer_class = AlerteSerializer
    permission_classes = [AllowAny]


