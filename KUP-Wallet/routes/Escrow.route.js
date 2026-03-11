const express = require("express");

const router = express.Router();

const escrowController = require("../controllers/Escrow.controller");

// LockFunds to EscrowWallet route
router.post("/lock", escrowController.lockFunds);

// ReleaseFunds from EscrowWallet to Farmer's Wallet (Automation) route
router.post("/release", escrowController.releaseFunds);

module.exports = router;