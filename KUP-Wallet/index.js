const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5005;

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the KUP_Wallet System');
})

// Routes for Walet Management
app.use("/api/v1/pay-system-kup/wallet",require("./routes/Wallet.route"));
app.use("/api/v1/pay-system-kup/escrow",require("./routes/Escrow.route"));
app.use("/api/v1/pay-system-kup/payout",require("./routes/Payout.route"));
app.use("/api/v1/pay-system-kup/withdraw",require("./routes/Withdraw.route"));

app.listen(PORT, () => {
    console.log("KUP Wallet server running");
});