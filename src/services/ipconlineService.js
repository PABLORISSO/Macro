export async function getIpconlineProducts() {
  const base = import.meta.env.VITE_API_URL || '';
  const url = `${base}/api/ipconline/products`;

  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}
