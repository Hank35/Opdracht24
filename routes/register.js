// Require modules
const express       = require('express');
const jwt           = require('jsonwebtoken');
const database      = require('../database');
const { validate }  = require('../models/user');

// Get router
const router = express.Router();


router.post('/', (req, res) => {

    const login = {
        email: req.body.email,
        password: req.body.password,
        voornaam: req.body.firstname,
        achternaam: req.body.lastname
    };
    // Validating the user object
    const { error } = validate(login);
    if (error) return res.status(412).send(error.details[0].message);

    // Checking if user exists
    database.query(`SELECT * FROM user WHERE email = '${login.email}'`, (error, result, fields) => {
        if (rows.size > 0) return res.status(412).send('User already exists');
        // Inserting user
        database.query('INSERT INTO user SET ?', login, (error, result, fields) => {
            database.query(`SELECT * FROM user WHERE id = ${result.insertId}`, (error, result, field) => {
                res.json(result);
            })
        })
    });

});


// Export register routes
module.exports = router;
