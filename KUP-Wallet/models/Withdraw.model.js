const mongoose = require('mongoose');

//  Money-Withdrawl Schema to withdraw money from Farmer's own wallet and transfer to his respected bank ( Post-Settlement functionality)
const withdrawSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    status: {
        type: String,
        enum: ["REQUESTED", "APPROVED", "PROCESSING", "COMPLETED", "REJECTED"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Withdraw", withdrawSchema);