import { useEffect, useState } from "react";
import BarChart from "../charts/barChart.jsx";
import InflacionComparadaChart from "../charts/InflacionComparadaChart.jsx";
import { getInflacion } from "../../services/inflationservice";

function InflationSection() {
  const [inflacion, setInflacion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getInflacion()
      .then(setInflacion)
      .catch(() => setError("No se pudo cargar inflación."));
  }, []);

  if (error) return <div>{error}</div>;
  if (!inflacion) return <div>Cargando inflación...</div>;

  const labels = inflacion?.datos?.map((d) => d.fecha.slice(0, 7)) || [];
  const data = inflacion?.datos?.map((d) => d.inflacionMensual) || [];

  return (
    <section className="dashboard-card">
      <h2>Inflación</h2>

      <div className="data-box">
        <span>Último dato</span>
        <strong>{inflacion?.ultimoDato?.inflacionMensual ?? "N/D"}%</strong>
      </div>

      <BarChart
        title="Inflación mensual (%)"
        labels={labels}
        data={data}
        suffix="%"
        highlightColor="#dc2626"
      />

      <InflacionComparadaChart />
    </section>
  );
}

export default InflationSection;