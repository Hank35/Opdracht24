// Required Modules
const express       = require('express');
const login         = require('./routes/login');
const register      = require('./routes/register');
const studentenhuis = require('./routes/studentenhuis');
const meal          = require('./routes/maaltijd');
const deelnemer     = require('./routes/deelnemer');
// const index         = require('./test/studentenhuis.routes.test')
// Middleware
const app = express();
app.use(express.json());
app.use('/api/login',           login);
app.use('/api/register',        register);
app.use('/api/studentenhuis',   studentenhuis);
app.use('/api/studentenhuis',   meal);
app.use('/api/studentenhuis',   deelnemer)

// Listening
const port = process.env.PORT || 4200;
app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});
index = "localhost:4200";

module.exports = index
