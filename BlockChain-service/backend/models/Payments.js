const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    tradeId: { type: String, unique: true },  // orderId from order transaction and this associated with paymentBlockchainId for reference and parallel tracking

    paymentBlockchainId: { type: Number, unique: true }, // blockChainId for payment transaction block

    blockchainId: { type: Number, unique: true }, // blockChainId from order transaction block and this associated with paymentBlockchainId for reference and parallel tracking

    farmerId: { type: String, required: true },

    buyerId: { type: String, required: true },

    cropName: { type: String, required: true },

    quantity: { type: Number, required: true },

    price: { type: Number, required: true },

    orderStatus: {
        type: String,
        enum: ['PENDING', 'PAID_ESCROW', 'DELIVERED', 'COMPLETED'],
        default: 'COMPLETED'
    },

    transactionHash: { type: String }, // The unique ID for the trade transaction

    totalCost: String,

    paymentTxHash: String,

    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);