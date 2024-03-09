const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
const mysql = require('mysql');

var conn = mysql.createConnection({
    host:DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
   
});

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log(DB_NAME + "DATABASE CONNECTED SUCCESSFULLY")
    }

})


module.exports = conn;



