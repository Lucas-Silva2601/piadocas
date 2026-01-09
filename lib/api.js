// Serviço de API para comunicação com as API routes do Next.js

/**
 * Gera uma piada usando a API do próprio Next.js.
 * @param {string|null} tema - Tema para a piada (opcional)
 * @returns {Promise<{piada: string, tema: string}>}
 */
export async function generateJoke(tema = null) {
  try {
    const response = await fetch("/api/jokes/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tema }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.erro || errorData.detail || `Erro HTTP ${response.status}: ${response.statusText}`;

      // Mensagens de erro mais amigáveis
      if (response.status === 401) {
        throw new Error("Erro de autenticação. Verifique a configuração da API.");
      } else if (response.status === 429) {
        throw new Error("Muitas requisições. Aguarde um momento e tente novamente.");
      } else if (response.status >= 500) {
        throw new Error("Erro no servidor. Tente novamente em alguns instantes.");
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Erro de rede
      throw new Error("Erro de conexão. Verifique se o servidor está rodando.");
    }
    throw error;
  }
}
