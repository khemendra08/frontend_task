export async function fetchData(url: string) {debugger
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
}