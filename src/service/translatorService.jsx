
export async function translateRequest(fromLang, toLang, code) {
  if (!code.trim()) return { result: "" };

  const payload = {
    sourceLanguage: fromLang,
    targetLanguage: toLang,
    codeSnippet: code.trim(),
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
    return { result: data.translatedCode || data.result || JSON.stringify(data, null, 2) };
  } catch (error) {
    console.error("Error during translation request:", error.message);
    return { result: `❌ Error: Al traducir el código, inténtalo de nuevo más tarde.` };
  }
}
