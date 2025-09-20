import { useState } from "react";
import { LANGS } from "../data/langs.jsx";
import { translateRequest } from "../service/translatorService.jsx";

export default function CodeTranslator() {
  const [code, setCode] = useState("");
  const [fromLang, setFromLang] = useState("python");
  const [toLang, setToLang] = useState("java");
  const [output, setOutput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState({ input: false, output: false });

  const handleTranslate = async () => {
    setIsTranslating(true);
    const { result } = await translateRequest(fromLang, toLang, code);
    setOutput(result);
    setIsTranslating(false);
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error("Error copiando texto:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
      {/* Navbar/Header */}
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">
          IA Code Translator
        </h1>
        <div className="flex flex-wrap gap-2">
          <select
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
          >
            {LANGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <span className="text-gray-500 self-center">→</span>
          <select
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
          >
            {LANGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !code.trim()}
            className="rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 text-sm font-medium text-white transition"
          >
            {isTranslating ? "..." : "Traducir"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Entrada */}
            <div className="relative">
              <textarea
                className="w-full h-[400px] p-4 font-mono text-sm bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                placeholder="✍️ Escribe aquí tu código..."
              />
              <button
                onClick={() => handleCopy(code, "input")}
                className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                {copied.input ? "✅ Copiado" : "📋 Copiar"}
              </button>
            </div>

            {/* Salida */}
            <div className="relative">
              <textarea
                className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-xl resize-none focus:outline-none placeholder-gray-400 shadow-sm"
                value={output}
                readOnly
                placeholder="📄 Aquí aparecerá la traducción..."
              />
              <button
                onClick={() => handleCopy(output, "output")}
                disabled={!output.trim()}
                className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
              >
                {copied.output ? "✅ Copiado" : "📋 Copiar"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-center shadow-sm">
        <a
          href="https://github.com/luisrocha021231/compiladoresproject"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition"
        >
          Ver en GitHub
        </a>
      </footer>
    </div>
  );
}
