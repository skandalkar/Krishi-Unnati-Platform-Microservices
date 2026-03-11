const Withdraw = require("../models/Withdraw.model");
const wallet = require('../models/Wallet.model');

//  Money-Withdrawl: To withdraw money from Farmer's own wallet and transfer to his respected bank ( Post-Settlement functionality) as per requested by farmer or raise request to transfer money from his wallet.

exports.requestWithdraw = async (userId, userRole, amount) => {

    const farmerWallet = await wallet.findOne({
        userId: userId,
        userRole: { $in: ["Farmer", "farmer"] }
    });

    if (!farmerWallet) {
        throw new Error("Wallet not found for user: Farmer");
    }

    if (farmerWallet.balance < amount) {
        throw new Error("Insufficient balance for withdrawl, Please check balance.");
        
    } else {
        farmerWallet.balance -= amount  //Deduct the amount from farmer's wallet balance
        await farmerWallet.save();
    }

    const withdraw = new Withdraw({
        userId,
        amount,
        status: "REQUESTED"
    });

    await withdraw.save()
    return withdraw;
};