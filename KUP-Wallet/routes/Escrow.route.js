const express = require("express");

const router = express.Router();

const escrowController = require("../controllers/Escrow.controller");

router.post("/lock", escrowController.lockFunds);
router.post("/release", escrowController.releaseFunds);

module.exports = router;