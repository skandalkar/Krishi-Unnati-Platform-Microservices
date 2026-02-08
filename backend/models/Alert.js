const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    tradeId: String,
    field: String,
    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
