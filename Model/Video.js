module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Video", {
    videoTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedImage: {
      type: DataTypes.STRING,
    },
    imageDescription: {
      type: DataTypes.TEXT,
    },
  });
};

//Définition du relation entre video et Categorie
// Categorie.hasMany(Videos); //Un catégorie peut contenir plusieurs vidéos
// Videos.belongsTo(Categorie); //Un vidéos doit appartenir à un catégorie
