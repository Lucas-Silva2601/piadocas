export default function SavedJokes({ piadas, onRemove }) {
  if (piadas.length === 0) {
    return (
      <div className="mt-8 rounded-[10px] bg-surface p-5 md:p-8">
        <h3 className="mb-5 text-center text-xl font-bold text-accent">Piadas Salvas</h3>
        <p className="p-5 text-center text-neutral-400">Nenhuma piada salva ainda.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[10px] bg-surface p-5 md:p-8">
      <h3 className="mb-5 text-center text-xl font-bold text-accent">Piadas Salvas</h3>
      <div className="flex flex-col gap-4">
        {piadas.map((piada, index) => (
          <div
            key={index}
            className="animate-fade-in-fast flex flex-col gap-4 rounded-md border border-accent bg-line p-4 transition-all duration-300 hover:border-accent-hover hover:bg-surface-hover md:flex-row md:items-start md:justify-between"
          >
            <p className="flex-1 break-words leading-relaxed">{piada}</p>
            <button
              className="flex h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center self-end rounded-full border border-accent bg-transparent text-lg text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-black md:self-auto"
              onClick={() => onRemove(index, piada)}
              aria-label={`Remover piada: ${piada.substring(0, 30)}...`}
              title="Remover piada"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
