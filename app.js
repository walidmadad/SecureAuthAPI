// Importation des modules nécessaires
require('dotenv').config(); // Charger les variables d'environnement depuis .env
const express = require('express'); // Framework pour créer l'API
const bcrypt = require('bcrypt'); // Librairie pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Librairie pour la gestion des tokens JWT
const bodyParser = require('body-parser'); // Middleware pour analyser le corps des requêtes
const mongoose = require('mongoose'); // ODM pour MongoDB

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000; // Port de l'application

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Utiliser le nouveau parser d'URL MongoDB
  useUnifiedTopology: true, // Utiliser la nouvelle logique de gestion des topologies
});

// Événements de la connexion à MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Définition du modèle utilisateur pour MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Le nom d'utilisateur est requis et unique
  password: { type: String, required: true }, // Le mot de passe est requis
});

const User = mongoose.model('User', userSchema); // Création du modèle Mongoose pour les utilisateurs

// Routes API

// Route pour l'inscription des utilisateurs
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Hachage du mot de passe pour plus de sécurité
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route pour la connexion des utilisateurs
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    // Vérification du mot de passe de l'utilisateur
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Utilisateur ou mot de passe incorrect' });
    }

    // Génération du token JWT avec expiration de 1 heure
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route protégée nécessitant un token JWT valide
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization']; // Récupération du header d'autorisation
  const token = authHeader && authHeader.split(' ')[1]; // Extraction du token JWT

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' }); // Si aucun token, accès refusé
  }

  // Vérification du token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' }); // Si le token est invalide
    }
    res.status(200).json({ message: `Bienvenue, ${user.username}!` }); // Si le token est valide, message de bienvenue
  });
});

// Démarrage du serveur Express
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
