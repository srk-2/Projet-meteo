from django.contrib import admin
from django.urls import path , include
from api.views import CreateUtilisateurView , UtilisateurDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/utilisateur/register/", CreateUtilisateurView.as_view(), name="register"),
    path("api/user/<int:pk>/", UtilisateurDetailView.as_view(), name="detail"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/', include('api.urls')), 
]
