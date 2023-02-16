const express = require("express");
const router = express.Router();

const { addBookedService, getPrice } = require("../contollers/service.js");

router.post("/addBookedService", addBookedService);
router.get("/getPrice/:idService", getPrice);

module.exports = router;
