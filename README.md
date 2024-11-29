# SecureAuthAPI - API d'Authentification avec Node.js, Express, MongoDB et JWT

Cette API fournit un système d'authentification sécurisé pour les utilisateurs. Elle permet l'inscription, la connexion et l'accès à des routes protégées via des tokens JWT. Le mot de passe des utilisateurs est haché avec **bcrypt** pour une sécurité optimale.

## Fonctionnalités

- **Inscription** : Création d'un utilisateur avec un mot de passe sécurisé (haché avec bcrypt).
- **Connexion** : Génération d'un token JWT pour l'utilisateur après une authentification réussie.
- **Route protégée** : Accès à une route nécessitant un token JWT valide pour valider l'authentification.

## Prérequis

Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Installation

1. Clonez ce repository :

   ```bash
   git clone https://github.com/walidmadad/SecureAuthAPI.git
   cd SecureAuthAPI
   ```
2. Installez les dépendances avec npm :

   ```bash
   npm install
   ```
3. Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

 *Remplacez your_mongo_connection_string par votre chaîne de connexion MongoDB.
 *Remplacez your_jwt_secret_key par une clé secrète pour signer vos tokens JWT.

4. Démarrez le serveur :
   
   ```bash
   npm start
   ```
Le serveur sera accessible à l'adresse : http://localhost:3000.

## Routes

### 1. **POST /register** - Inscription d'un utilisateur
- **Description** : Crée un nouvel utilisateur en hachant son mot de passe.
- **Requête** : 
  - **Méthode** : `POST`
  - **URL** : `/register`
  - **Corps de la requête** : 
    ```json
    {
      "username": "your-username",
      "password": "your-password"
    }
    ```
- **Réponse** :
  - **Code** : `201 Created`
  - **Corps de la réponse** :
    ```json
    {
      "message": "Utilisateur créé avec succès"
    }
    ```
  - **Code en cas d'erreur** : `400 Bad Request` si l'utilisateur existe déjà, ou `500 Internal Server Error` en cas d'erreur serveur.

---

### 2. **POST /login** - Connexion d'un utilisateur
- **Description** : Permet à un utilisateur de se connecter en vérifiant son mot de passe et en générant un token JWT.
- **Requête** :
  - **Méthode** : `POST`
  - **URL** : `/login`
  - **Corps de la requête** :
    ```json
    {
      "username": "your-username",
      "password": "your-password"
    }
    ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :
    ```json
    {
      "message": "Connexion réussie",
      "token": "your-jwt-token"
    }
    ```
  - **Code en cas d'erreur** : `400 Bad Request` si les identifiants sont incorrects, ou `500 Internal Server Error` en cas d'erreur serveur.

---

### 3. **GET /protected** - Route protégée nécessitant un token JWT
- **Description** : Permet d'accéder à une route protégée, en validant le token JWT envoyé dans l'en-tête `Authorization`.
- **Requête** :
  - **Méthode** : `GET`
  - **URL** : `/protected`
  - **En-tête de la requête** :
    ```http
    Authorization: Bearer your-jwt-token
    ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :
    ```json
    {
      "message": "Bienvenue, your-username!"
    }
    ```
  - **Code en cas d'erreur** : 
    - `401 Unauthorized` si le token n'est pas présent.
    - `403 Forbidden` si le token est invalide.
    - `500 Internal Server Error` en cas d'erreur serveur.

## Technologies

Ce projet utilise les technologies suivantes :

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework pour construire des applications web et des API avec Node.js.
- **MongoDB** : Base de données NoSQL pour stocker les informations des utilisateurs.
- **JSON Web Token (JWT)** : Standard ouvert pour sécuriser les échanges entre un client et un serveur via des tokens signés.
- **bcrypt** : Librairie pour sécuriser les mots de passe avec un algorithme de hachage.
- **dotenv** : Librairie pour gérer les variables d'environnement dans le projet.

---

## Auteurs

- **Walid Madad** : Développeur principal. [GitHub](https://github.com/walidmadad)

---

## License

Ce projet est sous licence **MIT**.

Voir le fichier [LICENSE](LICENSE) pour plus de détails.
