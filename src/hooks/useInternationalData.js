import { useState, useEffect } from "react";

export function useInternationalData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalDashboard, setGlobalDashboard] = useState(null);
  const [regionalComparison, setRegionalComparison] = useState([]);
  const [latamDashboard, setLatamDashboard] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/international/latam`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        setRegionalComparison(
          Array.isArray(data)
            ? data.map((item) => ({
                country: item.country,
                value: item.crecimiento_pbi || 0,
              }))
            : []
        );
        setLatamDashboard({ resumen: "Datos de LATAM cargados desde World Bank" });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { globalDashboard, regionalComparison, latamDashboard, loading, error };
}
