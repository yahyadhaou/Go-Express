const express = require("express");
const router = express.Router();
//Require controller modules

const { AddEmployer } = require("../contollers/Employer.js");
router.post("/addEmployer", AddEmployer);

module.exports = router;
