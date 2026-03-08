const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: String,
    type: {
        type: String,
        enum: [
            "DEPOSIT",
            "ESCROW_LOCK",
            "ESCROW_RELEASE",
            "PAYOUT",
            "WITHDRAW"
        ]
    },
    amount: Number,
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"]
    },
    referenceId: String

}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);