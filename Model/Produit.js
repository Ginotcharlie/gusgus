module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Produit", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // Ajoutez d'autres colonnes si nécessaire
    panierId: {
      type: DataTypes.INTEGER, // Il s'agit de la clé étrangère qui lie le produit à un panier
    },
  });
};
