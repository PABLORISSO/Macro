async function fetchExchangeRate() {
  const response = await fetch(
    "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/5?Desde=2024-01-01"
  );

  if (!response.ok) {
    throw new Error(`Error BCRA: ${response.status}`);
  }

  const json = await response.json();

  // 🔥 esto es lo importante del formato BCRA
  const detalle = json?.results?.[0]?.detalle || [];

  // transformar a tu formato
  const datosOrdenados = detalle
    .map((item) => ({
      fecha: item.fecha,
      valor: item.valor,
    }))
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  // 👉 convertir diario → mensual (último valor de cada mes)
  const porMes = new Map();

  for (const item of datosOrdenados) {
    const mes = item.fecha.slice(0, 7);
    porMes.set(mes, item); // pisa → queda el último del mes
  }

  const datosMensuales = Array.from(porMes.values()).slice(-24);

  const ultimoDato = datosMensuales[datosMensuales.length - 1] || null;

  return {
    ultimoDato,
    datos: datosMensuales,
  };
}

module.exports = { fetchExchangeRate };