from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Utilisateur , Capteur, CapteurData, ApiMeteo, Prediction , Alerte
from .serializers import UtilisateurSerializer,  CapteurSerializer, CapteurDataSerializer, ApiMeteoSerializer, PredictionSerializer ,  AlerteSerializer
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


class ApiMeteoListCreateView(generics.ListCreateAPIView):
    queryset = ApiMeteo.objects.all()
    serializer_class = ApiMeteoSerializer
    permission_classes = [AllowAny]

class ApiMeteoDetailView(generics.RetrieveAPIView):
    queryset = ApiMeteo.objects.all()
    serializer_class = ApiMeteoSerializer
    permission_classes = [AllowAny]

class ApiMeteoDeleteView(generics.DestroyAPIView):
    queryset = ApiMeteo.objects.all()
    serializer_class = ApiMeteoSerializer
    permission_classes = [AllowAny]

class ApiMeteoUpdateView(generics.UpdateAPIView):
    queryset = ApiMeteo.objects.all()
    serializer_class = ApiMeteoSerializer
    permission_classes = [AllowAny]


class PredictionListCreateView(generics.ListCreateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [AllowAny]

class PredictionDetailView(generics.RetrieveAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [AllowAny]

class PredictionDeleteView(generics.DestroyAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [AllowAny]

class PredictionUpdateView(generics.UpdateAPIView):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
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
                libelle=serializer.validated_data['libelle'],
                description=serializer.validated_data['description']
            ))
        
        Alerte.objects.bulk_create(alertes)

class AlerteListView(generics.ListAPIView):
    serializer_class = AlerteSerializer
    permission_classes = [AllowAny]

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


