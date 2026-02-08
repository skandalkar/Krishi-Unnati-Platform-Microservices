const Trade = require("../models/Order");
const Alert = require("../models/Alert");
const verifyTradeIntegrity = require("../middleware/verifyIntegrity");

const startTradeMonitoring = () => {
  console.log("Trade database monitoring started...");

  const changeStream = Trade.watch([], { fullDocument: "updateLookup" });

  changeStream.on("change", async (change) => {
    console.log("DATABASE CHANGE DETECTED");
    console.log("Operation:", change.operationType);

    if (change.operationType !== "update") return;

    const updatedFields = change.updateDescription.updatedFields;
    const trade = change.fullDocument;

    // Only monitor blockchain-confirmed trades
    if (!trade.confirmedOnChain) return;

    const sensitiveFields = ["price", "quantity", "farmer", "buyer"];

    for (let field of sensitiveFields) {
      if (updatedFields[field] !== undefined) {

        console.error("CRITICAL ALERT");
        console.error(`Trade ID: ${trade.tradeId}`);
        console.error(`Sensitive field modified: ${field}`);
        console.error("Triggering blockchain verification...");

        // Persist alert
        await Alert.create({
          tradeId: trade.tradeId,
          field: field,
          newValue: updatedFields[field],
          timestamp: new Date()
        });

        // Verify against blockchain
        await verifyTradeIntegrity(trade.tradeId);

        break; // prevent duplicate alerts for same update
      }
    }
  });
};

module.exports = startTradeMonitoring;