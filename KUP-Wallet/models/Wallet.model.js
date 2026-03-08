const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    userRole: {
        type: String,
        required: true
    },
    balance: { type: Number, default: 0 },
    // escrowBalance: { type: Number, default: 0}
    escrowBalance: {
        type: Number,
        default: function () {
            return /buyer/i.test(this.userRole) ? 0 : undefined;
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Wallet", walletSchema);