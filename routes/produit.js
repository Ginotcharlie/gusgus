const express = require("express");
const router = express.Router();
const { Produit } = require("../database/database");

router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll(); // Utilisez la méthode "findAll" pour récupérer tous les produits
    res.status(201).json(produits);
    // Traitez les produits récupérés comme vous le souhaitez (par exemple, renvoyez-les en réponse)
    //    produits.then((produits) => {
    //     // Traitez les produits récupérés ici (par exemple, renvoyez-les en réponse HTTP)
    //     console.log(produits);
    //   })
    //   .catch((error) => {s
    //     // Gérez les erreurs ici
    //     console.error(error);
    //   });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
});

router.get("/productsByNom/:produit ", (req, res) => {
  Produit.findAll({
    where: {
      name: {
        [Sequelize.Op.like]: req.params.produit, // Le % est un caractère générique pour correspondre à n'importe quelle séquence de caractères avant et après "John".
      },
    },
  });
});

router.post("/add", (req, res) => {
  Produit.create(req.body)
    .then((produit) => {
      res.json({ produit });
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu etre ajouter. Ressayer dans quelque instants.";
      res.statut(500).json({ message, data: error });
    });
});

module.exports = router;
