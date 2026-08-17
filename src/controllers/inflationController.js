const { obtenerInflacionMensual } = require("../services/inflationService");

async function getInflacion(req, res) {
  try {
    const data = await obtenerInflacionMensual();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en getInflacion:", error.message);

    res.status(500).json({
      error: "No se pudo obtener la inflación mensual",
    });
  }
}

module.exports = {
  getInflacion,
};