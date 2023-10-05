//Configuration de la base de donnée
// Installer sequelize : npm install sequelize
// Installe msql2 ==> on utile msql2 : npm install mysql2

//Importer Sequelize
const { Sequelize, DataTypes } = require("sequelize");

//Importer les tables ici
const UserModel = require("../Model/User");
const CategorieModel = require("../Model/Categorie");
const VideosModel = require("../Model/Video");
const ProduitModel = require("../Model/Produit");
const PanierModel = require("../Model/Panier");

//Initialisation de la base de donnée
const sequelize = new Sequelize("warrior", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

//Synchronisation de la base de donnée === migration
const initDb = () => {
  return sequelize
    .sync({ force: true })
    .then(console.log("La base de donnee a bien ete initialisee."))
    .catch((error) => {
      console.log("Erreur lors de la synchronisation a la bd");
    });
};

const User = UserModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);
const Videos = VideosModel(sequelize, DataTypes);
const Produit = ProduitModel(sequelize, DataTypes);
const Panier = PanierModel(sequelize, DataTypes);

module.exports = {
  initDb,
  User,
  Categorie,
  Videos,
  Produit,
  Panier,
};
