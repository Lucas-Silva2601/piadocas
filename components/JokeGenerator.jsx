"use client";

import { useState } from "react";

export default function JokeGenerator({ onGenerate }) {
  const [tema, setTema] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(tema.trim() || null);
  };

  return (
    <div className="mb-8 rounded-[10px] bg-surface p-5 md:p-8">
      <h2 className="mb-5 text-center text-2xl font-bold text-accent">
        Gerador de Piadas Negras
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2.5 md:flex-row">
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Digite um tema (ex: morte, política, relacionamentos)"
            className="flex-1 rounded-md border border-accent bg-line px-3 py-3 text-base text-white focus:border-accent-hover focus:outline-none"
            aria-label="Campo de entrada para tema da piada"
            aria-describedby="tema-help"
          />
          <span id="tema-help" className="sr-only">
            Digite um tema opcional para a piada ou deixe vazio para usar tema padrão
          </span>
          <button
            type="submit"
            className="rounded-md bg-accent px-6 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-accent-hover active:scale-95 md:w-auto"
            aria-label="Gerar piada"
          >
            Gerar Piada
          </button>
        </div>
      </form>
    </div>
  );
}
