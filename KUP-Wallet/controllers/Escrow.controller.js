const escrowService = require("../services/Escrow.service");


const lockFunds = async (req, res) => {
    try {
        const { buyerId, sellerId, amount, orderId } = req.body;
        const escrow = await escrowService.lockFunds(
            buyerId,
            sellerId,
            amount,
            orderId
        );
        res.status(201).json({
            success: true,
            data: escrow
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const releaseFunds = async (req, res) => {

    try {
        const { orderId } = req.body;
        const result = await escrowService.releaseFunds(orderId);
        res.json({
            success: true,
            message: "Escrow released",
            data: result
        });
    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    lockFunds,
    releaseFunds
};