const express = require("express");

const router = express.Router();

const withdrawController = require("../controllers/Withdraw.controller");

router.post("/request", withdrawController.requestWithdraw);

module.exports = router;