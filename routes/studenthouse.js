// Require modules
const express = require('express');
const auth = require('../middleware/auth');
const database = require('../database');
const { validate } = require('../models/studenthouse');

// Get router
const router = express.Router();

router.post('/', auth, (req, res) => {

    console.log('User in req:\n', req.user);

    // Getting studenthouse
    const studentenhuis = {
        naam: req.body.naam,
        adres: req.body.adres,
        userId: req.user.id.toString()
    };
    console.log('About to insert:\n', studentenhuis);

    // Validating client input
    const { error } = validate(studentenhuis);
    if (error) return res.status(412).send(error.details[0].message);

    // Inserting studentenhuis
    database.query('INSERT INTO studentenhuis SET ?', studentenhuis, (error, result, fields) => {
        // Querying studentenhuis and sending to client
        database.query(`SELECT * FROM studentenhuis WHERE id = ${result.insertId}`, (error, result, field) => {
            res.status(200).json(result);
        })
    })

});

router.get('/', auth, (req, res) => {

    // Querying studentenhuis and sending to client
    database.query('SELECT * FROM studentenhuis', (error, result, fields) => {
        res.status(200).json(result);
    })

});

router.get('/:id', auth, (req, res) => {

    database.query(`SELECT * FROM studentenhuis WHERE id = '${req.params.id}'`, (error, result, fields) => {
        if (result.length === 0) return res.status(404).send('Niet gevonden (huisId bestaad niet)');
        res.status(200).json(result);
    })

});

router.put('/:id', auth, (req, res) => {

    // Getting studenthouse
    const studentenhuis = {
        naam: req.body.naam,
        adres: req.body.adres,
        userId: req.user.id.toString()
    };
    console.log('About to update:\n', studentenhuis);
    // Validating client input
    const { error } = validate(studentenhuis);
    if (error) return res.status(412).send(error.details[0].message);

    database.query(`SELECT * FROM studentenhuis WHERE id = '${req.params.id}'`, (error, result, fields) => {
        if (result.length === 0) return res.status(404).send('Niet gevonden (huisId bestaad niet)');
        console.log(`Client user id: ${studentenhuis.userId}`);
        console.log(`Server user id: ${result[0].UserID}`);
        if (!(studentenhuis.userId.toString() === result[0].UserID.toString())) return res.status(409).send('Conflict (Gebruiker mag deze data niet wijzigen)');
        studentenhuis.id = result[0].ID;
        database.query(`UPDATE studentenhuis SET naam = '${studentenhuis.naam}', adres = '${studentenhuis.adres}' WHERE id = '${req.params.id}'`, studentenhuis, (error, result, fields) => {

            database.query(`SELECT * FROM studentenhuis WHERE id = '${req.params.id}'`, (error, result, fields) => {
                if (result.length === 0) return res.status(404).send('Niet gevonden (huisId bestaad niet)');
                res.status(200).json(result);
            })

        });
    })

});

router.delete('/:id', auth, (req, res) => {

    database.query(`SELECT * FROM studentenhuis WHERE id = '${req.params.id}'`, (error, result, fields) => {
        if (result.length === 0) return res.status(404).send('Niet gevonden (huisId bestaad niet)');
        if (!(req.user.id.toString() === result[0].UserID.toString())) return res.status(409).send('Conflict (Gebruiker mag deze data niet wijzigen)');
        database.query(`DELETE FROM studentenhuis WHERE id = '${req.params.id}'`, (err, result) => {

            res.status(200).send(`Studentenhuis met id: ${req.params.id} met succes verwijderd`);

        });
    })

});

router.post('/:id/maaltijd/', auth, (req,res) => {

    console.log('User in req:\n', req.user);

    // Getting studenthouse
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