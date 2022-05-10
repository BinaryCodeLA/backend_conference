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

const AddTalkController = async (req, res) => {
    try {
        console.log("req.body.params=> ", req.body);
        let talks = {
            title: req.body.title,
            abs: req.body.abs,
            room: req.body.room
        }
        if(!talks.title || !talks.abs || !talks.room)
            res.status(400).json({msg : "Bad Request"})
        
        let resultTalks = await db.master_db.AddTalks(talks);
        console.log("resultTalks: ", resultTalks);
        if(resultTalks.affectedRows > 0)
            res.status(201).json({msg : "Talks Added Sucessfully"});
    } catch (error) {
        console.log("error=> ", error);
        res.status(500).json({msg : "Internal Server Error"})
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

module.exports = { AddTalkController, RemoveTalkController, ListTalksController }