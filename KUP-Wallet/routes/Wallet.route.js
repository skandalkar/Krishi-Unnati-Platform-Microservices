const express = require("express");
const router = express.Router();

const walletController = require("../controllers/Wallet.controller");

router.post("/create", walletController.createWallet);  // wallet creation
router.post("/deposit", walletController.addBalance);   // wallet adding amount
router.get("/:userId", walletController.getWallet);     // view wallet details: Id, role, balance, escrow (if-buyer)

module.exports = router;