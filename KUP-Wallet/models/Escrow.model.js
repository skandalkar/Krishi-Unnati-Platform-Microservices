const mongoose = require('mongoose');

// The Schema for Escrow-Wallet : Which central authorized money holder in between two parties

const escrowSchema = new mongoose.Schema({
    orderId: { type: String, required: true },   // ex. ord100320262017
    buyerId: { type: String, required: true },   // ex. buyer-id
    farmerId: { type: String, required: true },  // ex. farmer-id
    escrowBalance: { type: Number, required: true },    // ex. Qty * perPrice
    walletStatus: { type: String, enum: ["LOCKED", "RELEASED", "REFUNDED"] }   // ex. EscrowWallet status

}, { timestamps: true });

module.exports = mongoose.model("Escrow", escrowSchema);