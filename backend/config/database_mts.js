const mysql = require("mysql2")
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
db.connect((err)=>{
    if(err){
        console.error('Gagal Terhubung ke Database :',err);
        return;
    }else{
        console.log('Database Terhubung')
    }
})

module.exports = db;