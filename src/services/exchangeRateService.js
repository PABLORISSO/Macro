const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTipoCambio() {
  const response = await fetch(`${API_URL}/api/tipo-cambio`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el tipo de cambio");
  }

  return response.json();
}
