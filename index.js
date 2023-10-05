const express = require("express");
const app = express();
const cors = require("cors");

// Importation de la base de données
const sequelize = require("./database/database");

// Importation des routes créées
const auth = require("./routes/user");
const categorie = require("./routes/categorie");
const products = require("./routes/produit");
const panier = require("./routes/panier");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Ajout de middleware express.json()
app.use(express.json());

// Utilisation des routes
app.use("/api", auth); // Routes pour l'authentification
app.use("/api/categorie", categorie); // Routes pour ajouter les catégories
// app.use("/api/", products.test);
app.use("/api/produits", products); // Routes pour les produits
app.use("/api/panier", panier);

// Connection à la base de données MySQL
sequelize.initDb();
// Initialisation du serveur
app.listen(4000, () => {
  console.log("Serveur express en écoute sur le port 4000");
});
