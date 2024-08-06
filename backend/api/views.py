
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Utilisateur
from .models import TypeDeCapteur
from .serializers import UtilisateurSerializer, TypeDeCapteurSerializer

class CreateUtilisateurView(generics.CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]
    

class CreateUtilisateurView(generics.CreateAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]

    

class TypeDeCapteurListCreateView(generics.ListCreateAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]

class TypeDeCapteurCreateView(generics.CreateAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]

class TypeDeCapteurDetailView(generics.RetrieveAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]

class TypeDeCapteurDeleteView(generics.DestroyAPIView):
    queryset = TypeDeCapteur.objects.all()
    serializer_class = TypeDeCapteurSerializer
    permission_classes = [AllowAny]