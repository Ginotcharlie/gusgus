const Videos = require('../Model/Video');

//Importer les packages nécessaires pour la création des routes
const routes = require('express').Router();

//Importer le package nécessaire pour uploader les vidéos 
const multer = require('multer');

//Configuration du stockages des fichiers uploadés
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()* 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
})

const upload = multer({ storage });

//Ajouter un nouveau vidéos
router.post('/add', upload.single('video'), async(req, res) => {
    try {
        const newVideos = await Videos.create({
            videoTitle: req.body.videoTitle,
            selectedImage: video ? video.path : null,
            imageDescription: req.body.imageDescription,
        })
        const savedVideos = await newVideos.save();
        return res.status(201).json(savedVideos);
    } catch {
        console.error('Erreur lors de la création d\'un vidéos', error);
        return res.status(500).json({ message: 'Erreur lors de la création d\'un vidéos' });
    }
})

//Afficher les listes des vidéos
router.get('/all_videos', async(req, res) => {
    try {
        const listVideos = await Videos.findAll();
        return res.status(201).json(listCategorie);
    } catch (error) {
        console.error('Erreur lors de la génération du liste des vidéos', error)
        return res.status(500).json({ message: 'Erreur lors de la génération du liste des vidéos' });
    }
})


//Modifier un vidéos
router.put('edit/:id', upload.single('video'), async(req, res) => {
    const { id } = req.params;
    try {
        const updateVideos = await Videos.findByPk(id);
        if (updateVideos) {
            return res.status(404).json({ error: 'Videos introuvable' });
        }
        const updatedVideos = await updateVideos.update({
            titreVideo: req.body.titreVideo,
            contenuVideo: video ? video.path : null,
            descriptionVideo: req.body.descriptionVideo,
        })
        return res.status(201).json(updatedVideos);
    } catch (error) {
        console.error('Erreur lors de la mise à jour des vidéos');
        return res.status(500).json({ error: 'Erreur lors de la mise à jour des vidéos' });
    }
})

//Supprimer un vidéos
router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const deleteVideos = await Videos.findByPk(id);
        if (!deleteVideos) {
            return res.status(404).json({ error: "Videos introuvable" });
        }
        await deleteVideos.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error('Erreur lors de la suppréssion du vidéos');
        return res.status(500).json({ error: 'Erreur lors de la suppréssion du vidéos' });
    }
})

module.exports = router;