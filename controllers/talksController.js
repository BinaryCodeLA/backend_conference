const db = require('../db/index');

const ListTalksController = async (req, res) => {
    try {
        let resultTalks = await db.master_db.getTalks();
        if(resultTalks.length == 0)
            return res.status(204).json({msg : "no talks found"});
    
        return res.status(200).json({msg : resultTalks});
    } catch (error) {
        console.log("Error=> ", error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
   
}
const TalksWithAttendanceController = async (req, res) => {
    try {
        let resultTalks = await db.master_db.getTalks();
        var data = [];
        if(resultTalks.length == 0)
            return res.status(204).json({msg : "no talks found"});

       
        await resultTalks.forEach(element => {
                data.push({id: element.idtalks,tittle: element.tittle_talks, abstract: element.abstract_talks, room: element.room, speaker: element.speaker, attendees:[] })
            });
        
            if (data.length > 0){
                for (j=0; j < data.length; j++){
                    console.log("Id search=> ", data[j].id);
                    await db.master_db.GetAttendee(data[j].id).then((elm)=>{
                        console.log("Results=> ", elm);
                        if (elm.length > 0){
                            for (i=0; i < elm.length; i++){
                                console.log("elm[i].name=> ", elm[i].name);
                                data[j].attendees.push({name: elm[i].name, company: elm[i].company, email: elm[i].email, registered: elm[i].registered_Att});
                                console.log("i == elm.length ", i , elm.length - 1);
                                console.log("j == data.length ", j, data.length - 1);
                                console.log("Data Attendee: ",  data[j].attendees);
                                if (i == elm.length -1 && j == data.length - 1){
                                    return res.status(200).json({msg : data});
                                }
                            }
                        }else if(j == data.length - 1){
                            return res.status(200).json({msg : data});
                        }
    
                    });
                    
                }
            }else {
                res.status(204).json({msg : "no attendees found"});
            }       
    
        
    } catch (error) {
        console.log("Error=> ", error);
        return res.status(500).json({msg : "Internal Server Error"});
    }
   
}

const AddTalkController = async (req, res) => {
    try {
        console.log("req.body.params=> ", req.body);
        let talks = {
            title: req.body.title,
            abs: req.body.abs,
            room: req.body.room
        }
        if(!talks.title || !talks.abs || !talks.room)
           return res.status(400).json({msg : "Bad Request"})
        
        let resultTalks = await db.master_db.AddTalks(talks);
        console.log("resultTalks: ", resultTalks);
        if(resultTalks.affectedRows > 0)
           return res.status(201).json({msg : "Talks Added Sucessfully"});
    } catch (error) {
        console.log("error=> ", error);
         return res.status(500).json({msg : "Internal Server Error"})
    }
    
}

const RemoveTalkController = async (req, res) => {
    try {
        
        let id = req.body.id
     
        if(!id)
            res.status(400).json({msg : "Bad Request"})
        
        let resultTalks = await db.master_db.RemoveTalks(id);
        console.log("resultTalks: ", resultTalks);
        if(resultTalks.affectedRows > 0)
            res.status(200).json({msg : "Talks removed Sucessfully"});
    } catch (error) {
        console.log("error=> ", error);
        res.status(500).json({msg : "Internal Server Error"})
    }
}

module.exports = { AddTalkController, RemoveTalkController, ListTalksController, TalksWithAttendanceController }