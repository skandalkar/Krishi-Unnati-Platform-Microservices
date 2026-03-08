const Wallet = require("../models/Wallet.model");
const Escrow = require("../models/Escrow.model");

// Functionality to Lock the funds to Wallet
const lockFunds = async (buyerId, sellerId, amount, orderId) => {

  const wallet = await Wallet.findOne({ userId: buyerId, userRole: "Buyer" || "buyer" });

  if (wallet.balance < amount) {
    throw new Error("Insufficient funds");
  }

  wallet.balance -= amount;
  wallet.escrowBalance += amount;

  await wallet.save();

  const escrow = new Escrow({
    orderId,
    buyerId,
    sellerId,
    amount,
    status: "LOCKED"
  });

  return await escrow.save();
};


// Functionality to Release the funds to seller after order completion and status updation in Escrow-databse
const releaseFunds = async (orderId) => {

  const escrow = await Escrow.findOne({ orderId });

  const buyerWallet = await Wallet.findOne({ userId: escrow.buyerId });

  const sellerWallet = await Wallet.findOne({ userId: escrow.sellerId });

  buyerWallet.escrowBalance -= escrow.amount;

  sellerWallet.balance += escrow.amount;

  await buyerWallet.save();
  await sellerWallet.save();

  escrow.status = "RELEASED";

  await escrow.save();

  return escrow;
};

module.exports = { lockFunds, releaseFunds };