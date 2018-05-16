// Require modules
const express       = require('express');
const auth          = require('../middleware/auth');
const database      = require('../database');
const { validate }  = require('../models/maaltijd');


const router = express.Router();

router.post('/', auth, (req,res) => {

    console.log('User in req:\n', req.user);

    // Getting maaltijd
    const maaltijd = {
        naam: req.body.naam,
        beschrijving: req.body.beschrijving,
        ingredienten: req.body.ingredienten,
        allergie : req.body.allergie,
        prijs : req.body.prijs,
        userId : req.user.id.toString(),
        studentenhuisId : req.params.id
    };
    console.log('About to insert:\n', maaltijd);

    // Validating maaltijd
    const { error } = validate(maaltijd);
    if (error) return res.status(412).send(error.details[0].message);

    
    database.query(`SELECT * FROM studentenhuis WHERE ID = ${maaltijd.StudentenhuisID}`, (error, result, field) => {
        if (result.length === 0) return res.status(404).send('Niet gevonden (huisId bestaad niet)');
        database.query('INSERT INTO maaltijd SET ?', maaltijd, (error, result, fields) => {
            database.query(`SELECT * FROM maaltijd WHERE id = ${result.insertId}`, (error, result, field) => {
                res.status(200).json(result);
            })
        })
    });

});


module.exports = router;
