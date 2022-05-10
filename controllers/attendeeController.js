const AddAttendeeController = async (req, res) => {
    res.status(200).json({"response" : "attendee adding successfully"})
}

const AddAttendeeToTalkController = async (req, res) => {
    res.status(200).json({"response" : "attendee to talk adding successfully"})
}

module.exports = { AddAttendeeController, AddAttendeeToTalkController }