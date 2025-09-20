
export async function translateRequest(fromLang, toLang, code) {
  if (!code.trim()) return { result: "" };

  const payload = {
    originalLanguage: fromLang,
    targetLanguage: toLang,
    content: code.trim(),
  };

  const TRANSLATOR_ENDPOINT_URL = import.meta.env.VITE_TRANSLATOR_ENDPOINT_URL;

  try {
    const response = await fetch(TRANSLATOR_ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error en la petición");

    const data = await response.json();
    return { result: data.result || JSON.stringify(data, null, 2) };
  } catch (err) {
    return { result: `❌ Error: ${err.message}` };
  }
}
