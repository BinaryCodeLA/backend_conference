const express = require("express");
const router = express.Router();
const TalksController = require('../controllers/talksController');
const Security = require('../middleware/secure/index')

router.get("/", Security.verifyToken, TalksController.ListTalksController);
router.post("/new", Security.verifyToken, TalksController.AddTalkController);
router.delete("/remove",Security.verifyToken,TalksController.RemoveTalkController);
module.exports = router;

