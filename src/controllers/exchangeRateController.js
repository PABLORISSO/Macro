const { fetchExchangeRate } = require("../services/exchangeRateService");

async function getExchangeRate(req, res) {
  try {
    const data = await fetchExchangeRate();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tipo de cambio" });
  }
}

module.exports = { getExchangeRate };