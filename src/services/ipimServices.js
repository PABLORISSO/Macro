const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getIPIM() {
  const res = await fetch(`${API_URL}/api/ipim`);
  if (!res.ok) throw new Error("Error cargando IPIM");
  return res.json();
}