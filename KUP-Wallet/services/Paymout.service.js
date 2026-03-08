const Payout = require("../models/Payout.model");

exports.createPayout = async (userId, amount) => {
    const payout = new Payout({
        userId,
        amount,
        method: "BANK",
        status: "PROCESSING"
    });

    return await payout.save();
};