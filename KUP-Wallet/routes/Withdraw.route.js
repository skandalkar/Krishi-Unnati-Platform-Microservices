const express = require("express");

//  Money-Withdrawl: To withdraw money from Farmer's own wallet and transfer to his respected bank ( Post-Settlement functionality) as per requested by farmer or raise request to transfer money from his wallet.

const router = express.Router();

const withdrawController = require("../controllers/Withdraw.controller");

router.post("/request", withdrawController.requestWithdraw);

module.exports = router;