const mysql = require("mysql");
require('dotenv').config();

let master_db = {};

const pool = mysql.createPool(
    {
    'connectionLimit': process.env.DB_CONNECTION_LIMIT,
    'database': process.env.DB_NAME,
    'user': process.env.DB_USER,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'password': process.env.DB_PASSWORD
    }
    );


master_db.getTalks = () => {

    return new Promise((resolve, reject) => {
        
        pool.query("SELECT * FROM talks order by idtalks", (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}

master_db.AddTalks = (talks) => {

    return new Promise((resolve, reject) => {
        
        pool.query("INSERT INTO talks (tittle_talks, abstract_talks, room) values ( ? , ? , ?)",
        [talks.title, 
         talks.abs, 
         talks.room], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}
master_db.RemoveTalks = (id) => {

    return new Promise((resolve, reject) => {
        
        pool.query("DELETE from talks where idtalks = ?",[id], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}
master_db.UserLogin = (user) => {

    return new Promise((resolve, reject) => {
        
        pool.query("SELECT iduser FROM user where username = ? and password = ?",[
            user.username,
            user.password
        ], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}

module.exports = {master_db};