const crypto = require('crypto');

// Generate consistent SHA-256 fingerprint for trade data
// This function is used in both OrderFinalized and verifyIntegrity to ensure fingerprints match

function generateDataFingerprint(price, quantity, farmerId, buyerId) {
    // Normalize data types to ensure consistency across different sources Use separators to avoid hash collisions
    const normalizedPrice = String(price).trim();
    const normalizedQuantity = String(quantity).trim();
    const normalizedFarmerId = String(farmerId).trim().toLowerCase();
    const normalizedBuyerId = String(buyerId).trim().toLowerCase();

    const data = `${normalizedPrice}|${normalizedQuantity}|${normalizedFarmerId}|${normalizedBuyerId}`;
    const finger = crypto.createHash('sha256').update(data).digest('hex');


    return finger;
}

module.exports = { generateDataFingerprint };