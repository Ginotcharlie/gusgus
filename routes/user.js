//Importer le modéle ou la table User
const User = require('../Model/User');

//Importer le module Router pour pouvoir créer des route
const router = require('express').Router();

//Installer bcrypt pour hacher les mot de passe : npm install bcrypt
//importer bcrypt : 
const bcrypt = require('bcrypt');

//installer jwt pour gerer les connexion des utilisateurs et les tokens : npm install jsonwebtoken
//importer jwt dans le projet
const jwt = require('jsonwebtoken');

const crypto = require('crypto')

const secretKey = crypto.randomBytes(32).toString('hex');


//pour ajouter un nouveau User 
router.post('/signUp', async(req, res) => {
    try {

        //Hachage du mot de passe
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);

        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        console.error('Erreur lors de la création d\'utilisateur :', err);
        return res.status(201).json({ message: 'Erreur lors de la création d\'utilisateur' });
    }
})

//pour se connecter 
router.post('/login', (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Identifiant non trouvé' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }

                    // Le mot de passe est valide, nous pouvons générer un token JWT et renvoyer la réponse
                    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '24h' });

                    return res.status(200).json({
                        id: user.id,
                        token: token
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
});

module.exports = router;