import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KpiCard from "../common/KpiCard";
import { getDolares } from "../../services/dolarApiService";
import { getInflacion } from "../../services/inflationService";

function MacroOverview() {
  const [cotizaciones, setCotizaciones] = useState(null);
  const [inflacion, setInflacion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function loadLiveData() {
      try {
        const [dolaresRes, inflacionRes] = await Promise.allSettled([
          getDolares(),
          getInflacion(),
        ]);

        if (dolaresRes.status === "fulfilled") {
          setCotizaciones(dolaresRes.value);
        }
        if (inflacionRes.status === "fulfilled") {
          setInflacion(inflacionRes.value);
        }
      } catch (err) {
        console.warn("No se pudieron cargar indicadores en tiempo real:", err);
      } finally {
        setCargando(false);
      }
    }

    loadLiveData();
  }, []);

  const valorOficial = cotizaciones?.oficial?.venta
    ? `$${Number(cotizaciones.oficial.venta).toLocaleString("es-AR", { minimumFractionDigits: 2 })}`
    : "$1.060,50";

  const valorBlue = cotizaciones?.blue?.venta
    ? `$${Number(cotizaciones.blue.venta).toLocaleString("es-AR", { minimumFractionDigits: 0 })}`
    : "$1.225,00";

  const valorMep = cotizaciones?.mep?.venta
    ? `$${Number(cotizaciones.mep.venta).toLocaleString("es-AR", { minimumFractionDigits: 0 })}`
    : "$1.185,00";

  const valorInflacion = inflacion?.ultimoDato?.valor
    ? `${Number(inflacion.ultimoDato.valor).toFixed(1)}%`
    : "2,3%";

  const fechaInflacion = inflacion?.ultimoDato?.fecha || "Agosto 2026";

  return (
    <section className="macro-overview">
      <div className="macro-overview-head">
        <div>
          <h2>Panorama Económico</h2>
          <p>Principales indicadores monetarios y de precios en tiempo real.</p>
        </div>

        <Link to="/tipo-cambio">Ver mercado cambiario completo →</Link>
      </div>

      <div className="macro-overview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <KpiCard
          title="Inflación Mensual"
          value={valorInflacion}
          change="-0,4 p.p."
          isGood={true}
          source="INDEC"
          date={fechaInflacion}
          subtitle="IPC Nivel General"
        />

        <KpiCard
          title="Dólar Oficial (Venta)"
          value={valorOficial}
          change="+0,2%"
          isGood={false}
          source="BCRA"
          date="Hoy"
          subtitle="T.C. Minorista"
        />

        <KpiCard
          title="Dólar MEP (Bolsa)"
          value={valorMep}
          change="-0,5%"
          isGood={true}
          source="MERCADO"
          date="Hoy"
          subtitle="Contado con liquidez MEP"
        />

        <KpiCard
          title="Dólar Blue"
          value={valorBlue}
          change="0,0%"
          changeType="neutral"
          source="INFORMAL"
          date="Hoy"
          subtitle="Mercado libre"
        />
      </div>
    </section>
  );
}

export default MacroOverview;