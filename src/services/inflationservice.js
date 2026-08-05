const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getInflacion() {
  const response = await fetch(`${API_URL}/api/inflacion`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la inflación");
  }

  return response.json();
}