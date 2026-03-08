const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    method: {
        type: String,
        enum: ["UPI", "BANK", "WALLET"]
    },
    status: {
        type: String,
        enum: ["CREATED", "PROCESSING", "COMPLETED", "FAILED"]
    }

}, { timestamps: true });

module.exports = mongoose.model("Payout", payoutSchema);