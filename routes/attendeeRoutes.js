const express = require("express");
const router = express.Router();
const AttendeeController = require('../controllers/attendeeController');

router.post("/new",AttendeeController.AddAttendeeController);
router.post("/new/talk",AttendeeController.AddAttendeeToTalkController);
module.exports = router;

