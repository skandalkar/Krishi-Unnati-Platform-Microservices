const Wallet = require("../models/Wallet.model");

// Wallet Management for User's Wallet as per role:
// Buyer: Auto-create as logs to system, add, view wallet
// Farmer: Auto-create as logs to system view-only access to wallet cannot add funds to wallet but can withdraw to actual banks as per rais of request: withdraw

// Auto-create as logs to system. Common role: Buyer, Farmer
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


// Common role: Buyer, Farmer
const getWallet = async (userId) => {
    return await Wallet.findOne({ userId });
};


// Only rights to add balance to wallet for authorized to only Buyer.
const addBalance = async (userId, amount) => {
    const wallet = await Wallet.findOne({ userId });
    wallet.balance += amount;
    return await wallet.save();
};

module.exports = { createWallet, getWallet, addBalance };