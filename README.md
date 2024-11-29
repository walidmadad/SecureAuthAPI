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

