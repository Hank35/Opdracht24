// Require modules
const express = require('express');
const auth = require('../middleware/auth');
const database = require('../database');
const { validate } = require('../models/maaltijd');


const router = express.Router();

router.post('/', auth, (req,res) => {

    console.log('User in req:\n', req.user);

    // Getting maaltijd
    const maaltijd = {
        naam: req.body.naam,
        beschrijving: req.body.beschrijving,
        ingredienten: req.body.ingredienten,
        allergie : req.body.allergie,
        prijs : req.body.prijs
    };
    console.log('About to insert:\n', maaltijd);

    // Validating client input
    const { error } = validate(maaltijd);
    if (error) return res.status(412).send(error.details[0].message);

    // Inserting studentenhuis
    database.query('INSERT INTO maaltijd SET ?', maaltijd, (error, result, fields) => {
        // Querying studentenhuis and sending to client
        database.query(`SELECT * FROM maaltijd WHERE id = ${result.insertId}`, (error, result, field) => {
            res.status(200).json(result);
        })
    })

});


module.exports = router;
