var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'mlsensor.cdpjszvvkbxz.ap-northeast-2.rds.amazonaws.com',
    user: 'ehrnc',
    password: 'ehrnc6458!',
    database: 'login_test'
});
db.connect();

module.exports = db;