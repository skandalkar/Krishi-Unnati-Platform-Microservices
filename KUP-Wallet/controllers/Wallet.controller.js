const walletService = require("../services/Wallet.service");

const createWallet = async (req, res) => {
    try {
        const { userId,userRole } = req.body;
        const wallet = await walletService.createWallet(userId, userRole);
        res.status(201).json({
            success: true,
            data: wallet
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getWallet = async (req, res) => {
    try {
        const wallet = await walletService.getWallet(req.params.userId);
        res.json({
            success: true,
            data: wallet
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const addBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const wallet = await walletService.addBalance(userId, amount);
        res.json({
            success: true,
            data: wallet
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createWallet,
    getWallet,
    addBalance
}