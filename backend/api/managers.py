from django.contrib.auth.models import BaseUserManager

class UtilisateurManager(BaseUserManager):
    def create_user(self, username, email, password=None, telephone=None, first_name=None, last_name=None, **extra_fields):
        """
        Create and return a regular user with an email, password, and optional telephone number.
        """
        if not email:
            raise ValueError('The user must have an email address.')
        email = self.normalize_email(email)
        utilisateur = self.model(
            username=username, 
            email=email, 
            telephone=telephone, 
            first_name=first_name,
            last_name=last_name,    
            **extra_fields
        )
        utilisateur.set_password(password)
        utilisateur.save(using=self._db)
        return utilisateur

    def create_superuser(self, username, email, password=None, telephone=None, **extra_fields):
        """
        Create and return a superuser with an email, password, and optional telephone number.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('The superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('The superuser must have is_superuser=True.')

        return self.create_user(username, email, password, telephone=telephone, **extra_fields)
