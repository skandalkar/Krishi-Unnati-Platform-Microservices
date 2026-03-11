const express = require("express");
const router = express.Router();

const walletController = require("../controllers/Wallet.controller");

// Wallet Creation Common role: Buyer, Farmer
router.post("/create", walletController.createWallet);  

// wallet adding amount
router.post("/deposit", walletController.addBalance);   

// view wallet details: Id, role, balance, Common role: Buyer, Farmer
router.get("/:userId", walletController.getWallet);     

module.exports = router;