import React, { useEffect, useState } from 'react';
import { getIpconlineProducts } from '../services/ipconlineService';

export default function IpconlineProducts({ limit = 24 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getIpconlineProducts()
      .then((res) => {
        if (!mounted) return;
        setItems(Array.isArray(res.items) ? res.items.slice(0, limit) : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || String(err));
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [limit]);

  if (loading) return <div>Loading ipconline products...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!items.length) return <div>No products found.</div>;

  return (
    <div className="ipconline-products">
      <h3>IPConline — Productos (muestra {items.length})</h3>
      <ul>
        {items.map((p) => (
          <li key={p.sku_id || p.id} style={{ marginBottom: 8 }}>
            <strong>{p.nombre}</strong>
            {p.precio_lista != null && (
              <span> — ${p.precio_lista / 100}</span>
            )}
            {p.imagen && (
              <div style={{ marginTop: 4 }}>
                <img src={p.imagen} alt={p.nombre} style={{ height: 48 }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
