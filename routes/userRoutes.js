const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userController');
const Security = require('../middleware/secure/index')
router.post("/login",UserController.LoginController,Security.GetAccess);
router.post("/logout",UserController.LogoutController);


module.exports = router;


