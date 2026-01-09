// Chaves usadas no localStorage
export const STORAGE_KEYS = {
  SAVED_JOKES: "savedJokes",
};

/**
 * Salva uma piada no localStorage.
 * @param {string} piada - Texto da piada a ser salva
 */
export function saveJoke(piada) {
  if (!piada || !piada.trim()) {
    return;
  }

  const savedJokes = getSavedJokes();
  savedJokes.push(piada.trim());
  localStorage.setItem(STORAGE_KEYS.SAVED_JOKES, JSON.stringify(savedJokes));
}

/**
 * Retorna todas as piadas salvas.
 * @returns {string[]}
 */
export function getSavedJokes() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOKES);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // Erro ao ler localStorage — retorna array vazio para não quebrar a aplicação
    return [];
  }
}

/**
 * Remove uma piada pelo índice.
 * @param {number} index - Índice da piada a ser removida
 */
export function removeJoke(index) {
  const savedJokes = getSavedJokes();
  if (index >= 0 && index < savedJokes.length) {
    savedJokes.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOKES, JSON.stringify(savedJokes));
  }
}

/**
 * Limpa todas as piadas salvas.
 */
export function clearAllJokes() {
  localStorage.removeItem(STORAGE_KEYS.SAVED_JOKES);
}
