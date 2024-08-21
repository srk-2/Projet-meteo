from django.contrib.auth import views as auth_views
from django.urls import path
from .views import UserDetailView
from .views import (
    CreateUtilisateurView,
    UtilisateurListView,
    UtilisateurDetailView,
    UtilisateurDeleteView,
    UtilisateurUpdateView,


    CapteurListCreateView,
    CapteurDetailView,
    CapteurDeleteView,
    CapteurUpdateView,

    CapteurDataListCreateView,
    CapteurDataDetailView,
    CapteurDataDeleteView,
    CapteurDataUpdateView,

    ApiMeteoListCreateView,
    ApiMeteoDetailView,
    ApiMeteoDeleteView,
    ApiMeteoUpdateView,

    PredictionListCreateView,
    PredictionDetailView,
    PredictionDeleteView,
    PredictionUpdateView,

    AlerteListCreateView,
    AlerteListView,
    AlerteDetailView,
    AlerteDeleteView,
    AlerteUpdateView
)



urlpatterns = [

    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('api/utilisateur/register/', CreateUtilisateurView.as_view(), name='create-utilisateur'), 
    path('utilisateurs/', UtilisateurListView.as_view(), name='utilisateur-list'),
    path('utilisateurs/<int:pk>/', UtilisateurDetailView.as_view(), name='utilisateur-detail'),
    path('utilisateurs/<int:pk>/delete/', UtilisateurDeleteView.as_view(), name='utilisateur-delete'),
    path('utilisateurs/<int:pk>/update/', UtilisateurUpdateView.as_view(), name='utilisateur-update'),

    
    path('capteurs/', CapteurListCreateView.as_view(), name='capteur-list-create'),
    path('capteurs/<int:pk>/', CapteurDetailView.as_view(), name='capteur-detail'),
    path('capteurs/<int:pk>/delete/', CapteurDeleteView.as_view(), name='capteur-delete'),
    path('capteurs/<int:pk>/update/', CapteurUpdateView.as_view(), name='capteur-update'),

    
    path('capteur-data/', CapteurDataListCreateView.as_view(), name='capteur-data-list-create'),
    path('capteur-data/<int:pk>/', CapteurDataDetailView.as_view(), name='capteur-data-detail'),
    path('capteur-data/<int:pk>/delete/', CapteurDataDeleteView.as_view(), name='capteur-data-delete'),
    path('capteur-data/<int:pk>/update/', CapteurDataUpdateView.as_view(), name='capteur-data-update'),

    
    path('apimeteo/', ApiMeteoListCreateView.as_view(), name='apimeteo-list-create'),
    path('apimeteo/<int:pk>/', ApiMeteoDetailView.as_view(), name='apimeteo-detail'),
    path('apimeteo/<int:pk>/delete/', ApiMeteoDeleteView.as_view(), name='apimeteo-delete'),
    path('apimeteo/<int:pk>/update/', ApiMeteoUpdateView.as_view(), name='apimeteo-update'),


    path('predictions/', PredictionListCreateView.as_view(), name='prediction-list-create'),
    path('predictions/<int:pk>/', PredictionDetailView.as_view(), name='prediction-detail'),
    path('predictions/<int:pk>/delete/', PredictionDeleteView.as_view(), name='prediction-delete'),
    path('predictions/<int:pk>/update/', PredictionUpdateView.as_view(), name='prediction-update'),

    
    path('alertes/', AlerteListCreateView.as_view(), name='alerte-list-create'),
    path('alertes/user/', AlerteListView.as_view(), name='alerte-list-user'),
    path('alertes/<int:pk>/', AlerteDetailView.as_view(), name='alerte-detail'),
    path('alertes/<int:pk>/delete/', AlerteDeleteView.as_view(), name='alerte-delete'),
    path('alertes/<int:pk>/update/', AlerteUpdateView.as_view(), name='alerte-update'),
]

   