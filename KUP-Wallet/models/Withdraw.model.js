const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    status: {
        type: String,
        enum: ["REQUESTED", "APPROVED", "PROCESSING", "COMPLETED", "REJECTED"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Withdraw", withdrawSchema);