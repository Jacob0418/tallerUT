const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD || "root123v",
    database: process.env.DBNAME
});

connection.connect((error) => {
    if(error) {
        console.error('Conexión a la BD no exitosa')
    } else {
        console.log('Conexión a la BD exitosa')
    }
});

module.exports = connection;