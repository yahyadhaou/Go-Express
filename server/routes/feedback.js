const express = require("express");
const router = express.Router();

const { AddFeedback } = require("../contollers/feedback.js");

router.post("/addFeedback", AddFeedback);

module.exports = router;
