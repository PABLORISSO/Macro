const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../../../frontend/src/data/ipim.csv");

  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      return res.status(500).json({
        error: "No se pudo leer el archivo de IPIM",
        detalle: error.message,
      });
    }

    const lines = content.split(/\r?\n/).filter(Boolean);
    const dataRows = lines.slice(1);
    const datos = dataRows
      .map((line) => {
        const [fecha, ipim] = line.split(",");
        return { fecha, ipim: Number(ipim) };
      })
      .filter((item) => item.fecha && Number.isFinite(item.ipim));

    return res.json({
      fuente: "INDEC / serie IPIM",
      datos,
      ultimoDato: datos[datos.length - 1] || null,
    });
  });
});

module.exports = router;