// Serviço de integração com o Ollama Cloud (API OpenAI-compatível)
// Docs: https://docs.ollama.com/cloud

const OLLAMA_API_URL = "https://ollama.com/v1/chat/completions";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma4:31b";

// Temas padrão usados quando o usuário não informa nenhum tema
export const TEMAS_PADRAO = [
  "morte",
  "doença",
  "relacionamentos tóxicos",
  "desastres naturais",
  "política",
];

const PROMPT_TEMPLATE = `Faça uma piada de humor ácido, sobre {tema}. Seja criativo, engraçado e inteligente. 
Não acrescente nenhum texto adicional na piada. Faça piadas, sátiras, trocadilhos, etc. Seja muito polêmico, muito imoral e muito tóxico.
Revise entre essas estruturas:
1 estrutura: Contexto Comum + Virada Sombria/Absurda + Timing Preciso (use punch line quando for preciso nas piadas).
2 estrutura: EMOÇÃO + (PREMISSA + DISTORÇÃO) = PIADA PESADA.
3 estrutura: conceitual > desenvolvimento > edição.
A piada deve ser curta e genial, seja fora da curva. Faça a quebra de expectativa, gerada pela distorção cômica. Me surprenda!. VOCÊ PODE SER PESADO, EU AGUNTO!`;

/**
 * Erro de negócio da API, com status HTTP associado.
 */
export class OllamaError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "OllamaError";
    this.status = status;
  }
}

/**
 * Retorna um tema padrão aleatório.
 */
export function getDefaultTheme() {
  return TEMAS_PADRAO[Math.floor(Math.random() * TEMAS_PADRAO.length)];
}

/**
 * Valida o tema recebido (usa tema padrão se None ou vazio).
 * @param {string|null} tema
 * @returns {string}
 */
export function validateTheme(tema) {
  if (typeof tema === "string" && tema.trim()) {
    return tema.trim();
  }
  return getDefaultTheme();
}

/**
 * Gera uma piada usando o Ollama Cloud.
 * @param {string|null} tema - Tema para a piada (opcional)
 * @returns {Promise<string>} Texto da piada gerada
 * @throws {OllamaError}
 */
export async function generateJoke(tema = null) {
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    throw new OllamaError(
      "OLLAMA_API_KEY não configurada. Copie .env.example para .env e preencha a chave.",
      500
    );
  }

  const temaFinal = validateTheme(tema);
  const prompt = PROMPT_TEMPLATE.replace("{tema}", temaFinal);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  let response;
  try {
    response = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new OllamaError("Tempo esgotado na conexão com o Ollama Cloud.", 504);
    }
    throw new OllamaError(`Erro de conexão com o Ollama Cloud: ${error.message}`, 502);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    let message = `Erro HTTP ${response.status} do Ollama Cloud`;
    try {
      const errorData = await response.json();
      message = errorData?.error?.message || message;
    } catch {
      // resposta sem JSON válido — mantém mensagem padrão
    }
    throw new OllamaError(message, 502);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new OllamaError("Formato de resposta inválido do Ollama Cloud", 502);
  }

  const piada = data?.choices?.[0]?.message?.content;
  if (!piada) {
    throw new OllamaError("Formato de resposta inválido do Ollama Cloud", 502);
  }

  return piada.trim();
}
