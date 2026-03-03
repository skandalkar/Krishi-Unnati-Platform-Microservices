const express = require('express');
const router = express.Router();

const createOrder = require('../controllers/CreateOrder');
const { verifyTrade } = require("../controllers/TradeController");
const verifyIntegrityTrade = require('../controllers/verifyTradeIntegrity');

router.post('/create', createOrder); 
router.post("/verify/:orderId", verifyTrade); 
router.get('/details/:id', verifyIntegrityTrade);

module.exports = router;