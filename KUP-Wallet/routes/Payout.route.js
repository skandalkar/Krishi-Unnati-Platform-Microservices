const express = require("express");

//  Post-Settlement functionality

const router = express.Router();

const payoutController = require("../controllers/Payout.controller");

router.post("/create", payoutController.createPayout);

module.exports = router;