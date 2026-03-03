const { ethers } = require('ethers');
require('dotenv').config();

const { fetchTradeFromBlockchain } = require('../services/blockchain.service');
const orders = require('../models/Order');

const EscrowABI = require('../../artifacts/contracts/EscrowPayment.sol/EscrowPayment.json').abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER_URL);
const escrowAddress = process.env.ESCROW_CONTRACT_ADDRESS;

const depositFund = async (req, res) => {

    /**
     OrderId, farmerAddress, buyerAddress, Amount must be associated with that order and must be in database and also in blockchain tradeStructure
     */

    try {
        const { orderId, farmerAddress, buyerAddress, amount } = req.body;

        // Check if orderId exists in database and also in blockchain
        const isOrderIdInDbExists = await orders.findOne({ orderId });
        const isOrderIdInBlockchain = await fetchTradeFromBlockchain(isOrderIdInDbExists.txHash);
        const ifBothMatch = isOrderIdInDbExists && isOrderIdInBlockchain;

        if (!ifBothMatch) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        } else {

            const signer = await provider.getSigner(buyerAddress);
            const escrowContract = new ethers.Contract(escrowAddress, EscrowABI, signer);

            const numericOrderId = BigInt(orderId.replace(/\D/g, ""));
            const tx = await escrowContract.deposit(numericOrderId, farmerAddress, buyerAddress, {
                value: ethers.parseEther(amount.toString())
            });
            await tx.wait();
            res.json({ success: true, txHash: tx.hash, amount: amount, message: "Funds locked in escrow" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/** */
const confirmDelivery = async (req, res) => {

    try {
        // const { orderId } = req.body;
        const { orderId, farmerAddress, buyerAddress, amount } = req.body;
        
        const isOrderIdExists = await orders.findOne({ orderId });
        
        if (!isOrderIdExists) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })

        } else {
            const signer = await provider.getSigner(buyerAddress);
            const escrowContract = new ethers.Contract(escrowAddress, EscrowABI, signer);

            const numericOrderId = BigInt(orderId.replace(/\D/g, ""));
            const tx = await escrowContract.confirmDelivery(numericOrderId);
            await tx.wait();
            res.json({ success: true, txHash: tx.hash, message: "Funds released to farmer" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { depositFund, confirmDelivery };