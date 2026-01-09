"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import JokeGenerator from "@/components/JokeGenerator";
import JokeDisplay from "@/components/JokeDisplay";
import RatingButtons from "@/components/RatingButtons";
import SavedJokes from "@/components/SavedJokes";
import Warning from "@/components/Warning";
import Notification from "@/components/Notification";
import { generateJoke } from "@/lib/api";
import { saveJoke, getSavedJokes, removeJoke } from "@/lib/storage";

export default function Home() {
  const [currentJoke, setCurrentJoke] = useState("");
  const [savedJokes, setSavedJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRatingButtons, setShowRatingButtons] = useState(false);
  const [notification, setNotification] = useState({ message: null, type: "success" });
  const [anoAtual, setAnoAtual] = useState(2026);

  // Ano atual dinâmico, evitando divergência entre servidor e cliente
  useEffect(() => {
    setAnoAtual(new Date().getFullYear());
  }, []);

  // Carrega piadas salvas ao iniciar (apenas no cliente)
  useEffect(() => {
    setSavedJokes(getSavedJokes());
  }, []);

  const handleGenerate = async (tema) => {
    setIsLoading(true);
    setError(null);
    setShowRatingButtons(false);
    setCurrentJoke("");

    try {
      const data = await generateJoke(tema);
      setCurrentJoke(data.piada);
      setShowRatingButtons(true);
    } catch (err) {
      const errorMessage = err.message || "Erro ao gerar piada. Verifique sua conexão e tente novamente.";
      setError(errorMessage);
      setShowRatingButtons(false);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification({ message: null, type: "success" });
  };

  const handleRate = (rating) => {
    if (rating === "boa" && currentJoke) {
      // Salva a piada se avaliada como genial
      saveJoke(currentJoke);
      setSavedJokes(getSavedJokes());
      showNotification("Piada salva com sucesso!", "success");
    } else if (rating === "ruim") {
      showNotification("Obrigado pelo feedback! Vamos tentar algo pior na próxima.", "info");
    } else if (rating === "medio") {
      showNotification("Justo. Nem tudo pode ser ouro... ou veneno.", "info");
    }
  };

  const handleRemove = (index) => {
    if (window.confirm("Tem certeza que deseja remover esta piada?")) {
      removeJoke(index);
      setSavedJokes(getSavedJokes());
      showNotification("Piada removida com sucesso!", "success");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl animate-fade-in flex-col px-4 py-5 md:px-5">
      <Header />
      <main className="flex-1">
        <section className="mb-5">
          <JokeGenerator onGenerate={handleGenerate} />
          <JokeDisplay piada={currentJoke} isLoading={isLoading} error={error} />
          {showRatingButtons && (
            <RatingButtons onRate={handleRate} disabled={isLoading} />
          )}
          <SavedJokes piadas={savedJokes} onRemove={handleRemove} />
        </section>
        <Warning />
      </main>
      <footer className="mt-8 border-t border-accent px-5 py-5 text-center text-neutral-400">
        <p>© {anoAtual} | Feito com ódio e sarcasmo</p>
      </footer>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </div>
  );
}
