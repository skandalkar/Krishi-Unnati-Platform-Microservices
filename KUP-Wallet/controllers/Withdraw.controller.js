const withdrawService = require("../services/Withdraw.service");

const requestWithdraw = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const withdraw = await withdrawService.requestWithdraw(
            userId,
            amount
        );
        res.status(201).json({
            success: true,
            data: withdraw
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = { requestWithdraw };