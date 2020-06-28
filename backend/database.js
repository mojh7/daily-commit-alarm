var mysql = require('mysql');
var db_config = require('./config/db-config.json');

module.exports = {
    init: function () {
        return mysql.createConnection(db_config);
    },
    connect: function(connection) {
        connection.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}

/*
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'daily-commit-alarm-db'
});

connection.connect();

connection.query('SELECT * from test_table', (error, rows, fields) => {
    if (error) throw error;
    console.log('test_table info is: ', rows);
});

connection.end();*/