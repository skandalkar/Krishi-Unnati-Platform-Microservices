const mongoose = require('mongoose');
const escrowSchema = new mongoose.Schema({
    orderId: String,
    buyerId: String,
    sellerId: String,
    amount: Number,
    status: {
        type: String,
        enum: ["LOCKED", "RELEASED", "REFUNDED"]
    }

}, { timestamps: true });

module.exports = mongoose.model("Escrow", escrowSchema);