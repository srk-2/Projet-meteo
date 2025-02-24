# Application météo de la FEAB

## Description
Ce projet est une application web pour la supervision des données agrométéorologiques. 
Il permet de collecter, visualiser, et analyser les données météorologiques via une interface utilisateur
développée en React TypeScript, avec un backend en Python/Django et une base de données MySQL.

## Prérequis
- Node.js
- Python
- Django
- MySQL
- Un gestionnaire de paquets Python (comme pip)

## Installation

### Frontend (React TypeScript)
1. Clonez le dépôt : `git clone https://github.com/srk-2/Projet-meteo.git`
2. Accédez au répertoire frontend : `cd frontend`
3. Installez les dépendances : `npm install`
4. Lancez l'application en mode développement : `npm run dev`
5. Pour créer une version de production : `npm run build`

### Backend (Django)
1. Accédez au répertoire backend : `cd backend`
2. Créez un environnement virtuel Python : `python -m venv env`
3. Activez l'environnement virtuel :
   - Sur Windows : `env\Scripts\activate`
   - Sur macOS/Linux : `source env/bin/activate`
4. Installez les dépendances : `pip install -r requirements.txt`
5. Configurez la base de données MySQL dans `settings.py` :
   ```python
   DATABASES = {
       'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'TMSUWEATHERPROJECT',
        'USER':'root',
        'PASSWORD':'1234',
        'HOST':'localhost',
        'PORT': '3306',
       }
   }
6. Appliquez les migrations : python manage.py migrate
7. Lancez le serveur Django : python manage.py runserver

### Base de Données
Créez la base de données MySQL nécessaire avec le script SQL fourni ou en configurant la base de données dans MySQL.
Assurez-vous que la base de données est configurée correctement dans le fichier settings.py du backend.
Utilisation
Accédez à l'application via http://localhost:5173 pour l'interface utilisateur.
Accédez à l'API backend via http://localhost:8000.


