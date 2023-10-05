module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Categorie", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titreCategorie: {
      type: DataTypes.STRING,
    },
  });
};
