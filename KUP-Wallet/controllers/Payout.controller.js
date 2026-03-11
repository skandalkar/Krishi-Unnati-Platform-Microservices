const payoutService = require("../services/Paymout.service");

//  Post-Settlement functionality

const createPayout = async (req, res) => {

    try {
        const { userId, amount } = req.body;
        const payout = await payoutService.createPayout(userId, amount);
        res.status(201).json({
            success: true,
            data: payout
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {createPayout};