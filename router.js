const express = require('express');
const router = express();
const UsersRouter = require('./routes/userRoutes');
const TalksRouter = require('./routes/talksRoutes');
const AttendeeRouter = require('./routes/attendeeRoutes');
router.use("/", UsersRouter);
router.use("/talks", TalksRouter);
router.use("/attendee", AttendeeRouter);
module.exports = router;