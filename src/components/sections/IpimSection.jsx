import { useEffect, useState } from "react";
import BarChart from "../charts/barChart.jsx";
import { getIPIM } from "../../services/ipimServices";

function IPIMSection() {
  const [ipim, setIpim] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getIPIM()
      .then(setIpim)
      .catch(() => setError("No se pudo cargar IPIM."));
  }, []);

  if (error) return <div>{error}</div>;
  if (!ipim) return <div>Cargando IPIM...</div>;

  const labels = ipim?.datos?.map((d) => d.fecha.slice(0, 7)) || [];
  const data = ipim?.datos?.map((d) => Number(d.ipim)) || [];

  return (
    <section className="dashboard-card">
      <h2>IPIM</h2>
      <BarChart
        title="Precios mayoristas (IPIM)"
        labels={labels}
        data={data}
      />
    </section>
  );
}

export default IPIMSection;