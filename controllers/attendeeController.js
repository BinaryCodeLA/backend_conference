const { parse } = require('dotenv');
const db = require('../db/index');


const AddAttendeeController = async (req, res) => {
    try {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        let attendee = {
            name: req.body.name,
            company: req.body.company,
            mail: req.body.mail
        }
        if(!attendee.name || !attendee.company || !attendee.mail.toString().match(regexEmail))
           return res.status(400).json({msg : "Bad Request"})
        
        let resultAttendee = await db.master_db.AddAttendee(attendee);
        console.log("resultAttendee: ", resultAttendee);
        if(resultAttendee != undefined && resultAttendee.affectedRows > 0)
           return res.status(201).json({msg : "Attendee Added Sucessfully"});
        else
            return res.status(500).json({msg : "Something was wrong, try again"});
    } catch (error) {
        console.log("error=> ", error);
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

const AddAttendeeToTalkController = async (req, res) => {
    try {
        let talkid = req.headers['talkid']
        let attendee = {
            name: req.body.name,
            company: req.body.company,
            mail: req.body.mail,
            talkid: parseInt(talkid)
        }
        console.log("attendee=> ", attendee);    
        console.log("mail=> ", validateEmail(attendee.mail));
        if(!attendee.name || !attendee.company || validateEmail(attendee.mail) == false || !attendee.talkid)
           return res.status(400).json({msg : "Bad Request"})
        
        let resultAttendee = await db.master_db.AddAttendeewithTalk(attendee);
        console.log("resultAttendee: ", resultAttendee);
        if(resultAttendee != undefined && resultAttendee.affectedRows > 0)
           return res.status(201).json({msg : "Attendee Added Sucessfully"});
        else
            return res.status(500).json({msg : "Something was wrong, try again"});
    } catch (error) {
        console.log("error=> ", error);
        return res.status(500).json({msg : "Internal Server Error"})
    }
}
const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
module.exports = { AddAttendeeController, AddAttendeeToTalkController }