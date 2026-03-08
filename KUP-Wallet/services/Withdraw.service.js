const Withdraw = require("../models/Withdraw.model");

exports.requestWithdraw = async (userId, amount) => {
    const withdraw = new Withdraw({
        userId,
        amount,
        status: "REQUESTED"
    });
    return await withdraw.save();
};