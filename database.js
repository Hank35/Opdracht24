const mySql = require('mysql');


let database = mySql.createConnection( {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        insecureAuth: true
});
database.connect( (error) => {

    if(error) {
        console.log(error);

    } else {
        console.log('MySQL connected...');

    }

});

module.exports = database;