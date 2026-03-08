const Wallet = require("../models/Wallet.model");

const createWallet = async (userId, userRole) => {
    let walletForUser = {};

    if (userRole === "Buyer" || userRole === "buyer") {
        walletForUser = {
            userId,
            userRole,
            balance: 0,
            escrowBalance: 0
        }
    } else if (userRole === "Farmer" || userRole === "farmer") {
        walletForUser = {
            userId,
            userRole,
            balance: 0,
        }
    }
    const wallet = new Wallet(walletForUser);
    return await wallet.save();
};

const getWallet = async (userId) => {
    return await Wallet.findOne({ userId });
};

const addBalance = async (userId, amount) => {
    const wallet = await Wallet.findOne({ userId });
    wallet.balance += amount;
    return await wallet.save();
};

module.exports = { createWallet, getWallet, addBalance };