module.exports = (sequelize, DataTypes) => {
  const Panier = sequelize.define("Panier", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Panier.associate = (models) => {
    Panier.hasMany(models.Produit);
  };

  return Panier;
};
