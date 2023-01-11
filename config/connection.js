const mysql = require('mysql2');

// Create the connection to database
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'xeNoGlP-it8#',
        database: 'employees_db'
    });

module.exports = db;
