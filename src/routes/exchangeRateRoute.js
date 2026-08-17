const express = require("express");
const router = express.Router();
const { getExchangeRate } = require("../controllers/exchangeRateController");

router.get("/tipo-cambio", getExchangeRate);

module.exports = router;