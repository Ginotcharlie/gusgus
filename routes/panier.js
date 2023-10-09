const { DataTypes } = require("sequelize");
const panier = require("../Model/Panier");
const produits = require("../database/database");

//Importer les packages pour créer un route
const router = require("express").Router();

router.post("/add", (req, res) => {
  panier
    .create(req.body)
    .then((panier) => {
      res.json({ panier });
    })
    .catch((error) => {
      const message =
        "Le panier n'a pas pu etre ajouter. Ressayer dans quelque instants.";
      res.statut(500).json({ message, data: error });
    });
});

module.exports = router;
