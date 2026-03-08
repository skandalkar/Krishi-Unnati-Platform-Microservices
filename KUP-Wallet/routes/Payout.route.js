const express = require("express");

const router = express.Router();

const payoutController = require("../controllers/Payout.controller");

router.post("/create", payoutController.createPayout);

module.exports = router;