const express = require("express");
const router = express.Router();
const AttendeeController = require('../controllers/attendeeController');
const Security = require('../middleware/secure/index')

router.post("/new",Security.verifyToken, AttendeeController.AddAttendeeController);
router.post("/new/talk",Security.verifyToken, AttendeeController.AddAttendeeToTalkController);
module.exports = router;

