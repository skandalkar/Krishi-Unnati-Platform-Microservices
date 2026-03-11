const mongoose = require("mongoose");

// Wallet-Schema for User's Wallet as per role:
// Buyer: { __id, userId, userRole, balance(wallet), escrowWalletBalance }
// Farmer: { __id, userId, userRole, balance(wallet)}
// Creation and Updation timestamp to internal logs purpose.

const walletSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    userRole: {
        type: String,
        required: true,
        enum: ["Buyer", "buyer", "Farmer", "farmer"]
    },

    balance: {
        type: Number,
        default: 0
    },

    escrowWalletBalance: {
        type: Number,
        default: function () {
            return /buyer/i.test(this.userRole) ? 0 : undefined;
        }
    }

}, { timestamps: true });

module.exports = mongoose.model("Wallet", walletSchema);