const db = require('../db/index');

const LoginController = async (req, res, next) => {
    try {
        const user = {
            username: req.headers['username'],
            password: req.headers['password']
        }
          
        if(user.username == undefined || user.password == undefined) {
           return res.status(403).json({msg : 'Unauthorized'});
        }
        var resultLogin = await db.master_db.UserLogin(user);
        console.log("resultLogin=> ", resultLogin);
        
        if(resultLogin.length == 0)
           return res.status(403).json({msg : 'Unauthorized'});
        req.userid = resultLogin[0].iduser;
        next();  
    } catch (error) {
       console.log("Error=> ", error);
       return res.status(500).json({msg : 'Internal Server Error'});
    }


   
}

const LogoutController = async (req, res) => {
    res.status(200).json({"response" : "logout successfully"})
}


module.exports = { LoginController, LogoutController }