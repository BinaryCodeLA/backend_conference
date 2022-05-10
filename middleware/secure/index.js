const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.SECRET;
const GetAccess = async (req, res) => {
   try {
      let id =  req.userid.toString();
      jwt.sign(id , secret_key , (err,token) => {
         if(err){
            return res.status(403).send({msg : 'Unauthorized'});
         }
     else {
            
            return res.status(200).json({msg:'success' , token: token})
         }
      })
   } catch (error) {
      console.log("Error=> ", error);
      return res.status(500).send({msg : 'Internal Server Error'});
   }
    
}

function verifyToken(req, res, next) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (token == null) return res.status(403).json({msg:"Forbidden"});
   jwt.verify(token, secret_key, (err, user) => {
      if (err) return res.status(404).json({msg:"missing"});      
      req.user = user;
      next();
   });
}

module.exports = { GetAccess, verifyToken }