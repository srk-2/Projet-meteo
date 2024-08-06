
from django.urls import path
from .views import (
    CreateUtilisateurView,
    TypeDeCapteurListCreateView,
    TypeDeCapteurCreateView,
    TypeDeCapteurDetailView,
    TypeDeCapteurDeleteView
)

urlpatterns = [
    # Vues pour Utilisateur
    path('api/utilisateur/register/', CreateUtilisateurView.as_view(), name='create-utilisateur'),

    # Vues pour TypeDeCapteur
    path('type-de-capteur/', TypeDeCapteurListCreateView.as_view(), name='type-de-capteur-list-create'),
    path('type-de-capteur/create/', TypeDeCapteurCreateView.as_view(), name='type-de-capteur-create'),
    path('type-de-capteur/<int:pk>/', TypeDeCapteurDetailView.as_view(), name='type-de-capteur-detail'),
    path('type-de-capteur/<int:pk>/delete/', TypeDeCapteurDeleteView.as_view(), name='type-de-capteur-delete'),
]

