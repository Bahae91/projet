const express = require('express');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/locallibrary', {

});

// Configuration du moteur de rendu Pug
app.set('view engine', 'pug');

// Configuration des routes
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

// Routes par défaut
app.get('/', (req, res) => {
 res.render('index');
});

// Lancement du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});