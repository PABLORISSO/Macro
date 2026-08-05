const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const indicadoresRoutes = require("./routes/indicadoresRoutes");
const inflacionRoutes = require("./routes/inflationRoute");
const exchangeRateRoute = require("./routes/exchangeRateRoute");
const reserveRoute = require("./routes/reserveRoute");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());





app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.get("/api/ipim", (req, res) => {
  const filePath = path.resolve(__dirname, "../../frontend/src/data/ipim.csv");

  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      return res.status(500).json({
        error: "No se pudo leer el archivo de IPIM",
        detalle: error.message,
      });
    }

    const lines = content.split(/\r?\n/).filter(Boolean);
    const datos = lines
      .slice(1)
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

app.use("/api/indicadores", indicadoresRoutes);
app.use("/api/inflacion", inflacionRoutes);
app.use("/api", exchangeRateRoute);
app.use("/api", reserveRoute);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


