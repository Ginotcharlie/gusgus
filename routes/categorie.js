const { DataTypes } = require('sequelize');
const Categorie = require('../Model/Categorie');

//Importer les packages pour créer un route
const router = require('express').Router();

//Ajouter un nouveau catégorie
router.post('/add', async(req, res) => {
    try {
        const newCategorie = await Categorie.create({
            titreCategorie: DataTypes.STRING,
        })
        const savedCategorie = await newCategorie.save()
        return res.status(201).json(savedCategorie);
    } catch {
        console.error('Erreur lors de la création de la catégorie:', error);
        return res.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
    }
})

//Afficher les listes des catégories
router.get('/all_categorie', async(req, res) => {
    try {
        const listCategorie = await Categorie.findAll();
        return res.status(201).json(listCategorie);
    } catch (error) {
        console.error('Erreur lors de la généreation du liste des catégories:', error);
        return res.status(500).json({ message: 'Erreur lors de la génération du liste des catégories' });
    }
})


//Mettre à jour un catégorie existants
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const updateCategorie = await Categorie.findByPk(id);
        if (udpadePoste) {
            return res.status(404).json({ error: 'Categorie introuvable' });
        }
        const updatedCategorie = await updateCategorie.update({
            titreCategorie: req.body.titreCategorie,
        })
        return res.status(201).json(updatedCategorie);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du catégorie', error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du catégorie' });
    }
})

//Supprimer un catégorie
router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const deleteCategorie = await Categorie.findByPk(id);
        if (!deleteCategorie) {
            return res.status(404).json({ error: 'Poste introuvable' });
        }
        await deletePoste.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors de la suppréssion du poste :', error);
        return res.status(500).json({ error: 'Erreur lors de la suppréssion du poste' });
    }
})

module.exports = router;