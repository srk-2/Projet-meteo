from django.urls import path
from .views import UserDetailView
from .views import (
    CreateUtilisateurView,
    UtilisateurListView,
    UtilisateurDetailView,
    UtilisateurDeleteView,
    UtilisateurUpdateView,

    TypeDeCapteurListCreateView,
    TypeDeCapteurDetailView,
    TypeDeCapteurDeleteView,
    TypeDeCapteurUpdateView,

    CapteurListCreateView,
    CapteurDetailView,
    CapteurDeleteView,
    CapteurUpdateView,

    CapteurDataListCreateView,
    CapteurDataDetailView,
    CapteurDataDeleteView,
    CapteurDataUpdateView,

    AutomateListCreateView,
    AutomateDetailView,
    AutomateDeleteView,
    AutomateUpdateView,

    WeatherDataListCreateView,
    WeatherDataDetailView,
    WeatherDataDeleteView,
    WeatherDataUpdateView,

    MeteoDataListCreateView,
    MeteoDataDetailView,
    MeteoDataDeleteView,
    MeteoDataUpdateView,

    WeatherPredictionListCreateView,
    WeatherPredictionDetailView,
    WeatherPredictionDeleteView,
    WeatherPredictionUpdateView,

    AlerteListCreateView,
    AlerteListView,
    AlerteDetailView,
    AlerteDeleteView,
    AlerteUpdateView
)

urlpatterns = [

    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('api/utilisateur/register/', CreateUtilisateurView.as_view(), name='create-utilisateur'), 
    path('utilisateurs/', UtilisateurListView.as_view(), name='utilisateur-list'),
    path('utilisateurs/<int:pk>/', UtilisateurDetailView.as_view(), name='utilisateur-detail'),
    path('utilisateurs/<int:pk>/delete/', UtilisateurDeleteView.as_view(), name='utilisateur-delete'),
    path('utilisateurs/<int:pk>/update/', UtilisateurUpdateView.as_view(), name='utilisateur-update'),

    
    path('type-de-capteurs/', TypeDeCapteurListCreateView.as_view(), name='type-de-capteur-list-create'),
    path('type-de-capteurs/<int:pk>/', TypeDeCapteurDetailView.as_view(), name='type-de-capteur-detail'),
    path('type-de-capteurs/<int:pk>/delete/', TypeDeCapteurDeleteView.as_view(), name='type-de-capteur-delete'),
    path('type-de-capteurs/<int:pk>/update/', TypeDeCapteurUpdateView.as_view(), name='type-de-capteur-update'),

    
    path('capteurs/', CapteurListCreateView.as_view(), name='capteur-list-create'),
    path('capteurs/<int:pk>/', CapteurDetailView.as_view(), name='capteur-detail'),
    path('capteurs/<int:pk>/delete/', CapteurDeleteView.as_view(), name='capteur-delete'),
    path('capteurs/<int:pk>/update/', CapteurUpdateView.as_view(), name='capteur-update'),

    
    path('capteur-data/', CapteurDataListCreateView.as_view(), name='capteur-data-list-create'),
    path('capteur-data/<int:pk>/', CapteurDataDetailView.as_view(), name='capteur-data-detail'),
    path('capteur-data/<int:pk>/delete/', CapteurDataDeleteView.as_view(), name='capteur-data-delete'),
    path('capteur-data/<int:pk>/update/', CapteurDataUpdateView.as_view(), name='capteur-data-update'),

    
    path('automates/', AutomateListCreateView.as_view(), name='automate-list-create'),
    path('automates/<int:pk>/', AutomateDetailView.as_view(), name='automate-detail'),
    path('automates/<int:pk>/delete/', AutomateDeleteView.as_view(), name='automate-delete'),
    path('automates/<int:pk>/update/', AutomateUpdateView.as_view(), name='automate-update'),

    
    path('weather-data/', WeatherDataListCreateView.as_view(), name='weather-data-list-create'),
    path('weather-data/<int:pk>/', WeatherDataDetailView.as_view(), name='weather-data-detail'),
    path('weather-data/<int:pk>/delete/', WeatherDataDeleteView.as_view(), name='weather-data-delete'),
    path('weather-data/<int:pk>/update/', WeatherDataUpdateView.as_view(), name='weather-data-update'),

    
    path('meteo-data/', MeteoDataListCreateView.as_view(), name='meteo-data-list-create'),
    path('meteo-data/<int:pk>/', MeteoDataDetailView.as_view(), name='meteo-data-detail'),
    path('meteo-data/<int:pk>/delete/', MeteoDataDeleteView.as_view(), name='meteo-data-delete'),
    path('meteo-data/<int:pk>/update/', MeteoDataUpdateView.as_view(), name='meteo-data-update'),

    
    path('weather-predictions/', WeatherPredictionListCreateView.as_view(), name='weather-prediction-list-create'),
    path('weather-predictions/<int:pk>/', WeatherPredictionDetailView.as_view(), name='weather-prediction-detail'),
    path('weather-predictions/<int:pk>/delete/', WeatherPredictionDeleteView.as_view(), name='weather-prediction-delete'),
    path('weather-predictions/<int:pk>/update/', WeatherPredictionUpdateView.as_view(), name='weather-prediction-update'),

    
    path('alertes/', AlerteListCreateView.as_view(), name='alerte-list-create'),
    path('alertes/user/', AlerteListView.as_view(), name='alerte-list-user'),
    path('alertes/<int:pk>/', AlerteDetailView.as_view(), name='alerte-detail'),
    path('alertes/<int:pk>/delete/', AlerteDeleteView.as_view(), name='alerte-delete'),
    path('alertes/<int:pk>/update/', AlerteUpdateView.as_view(), name='alerte-update'),
]

   