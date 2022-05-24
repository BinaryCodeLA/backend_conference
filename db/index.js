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

/**
 * Talks
 * 
 */
master_db.getTalks = () => {

    return new Promise((resolve, reject) => {
        
        pool.query("SELECT idtalks, tittle_talks, abstract_talks, room, IFNULL(name_spk,'No associated speaker') as speaker FROM talks left join speakers on idSpeakers = idSpeaker order by idtalks", (err, results) => {
            
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

/**
 * 
 * user 
 * 
 */
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

/**
 * Attendee
 */

 master_db.AddAttendee = (attendee) => {

    return new Promise((resolve, reject) => {
        
        pool.query("INSERT INTO attendees (name_att, company_att, email_att) values ( ? , ? , ? )",
        [attendee.name, 
         attendee.company, 
         attendee.mail
         ], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}

master_db.AddAttendeewithTalk = (attendee) => {

    return new Promise((resolve, reject) => {
        
        pool.query("INSERT INTO attendees (name_att, company_att, email_att,idtalks) values ( ? , ? , ?, ? )",
        [attendee.name, 
         attendee.company, 
         attendee.mail,
         attendee.talkid
         ], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}
master_db.GetAttendee = (talkid) => {

    return new Promise((resolve, reject) => {
        
        pool.query("SELECT name_att as name, company_att as company, email_att as email, registered_Att as registered FROM attendees where idtalks = ?",
        [talkid], (err, results) => {
            
            if(err){
                console.log("error is: "+err);
            }
            
            return resolve(results);
        })
    })
}
module.exports = {master_db};