export default function RatingButtons({ onRate, disabled = false }) {
  const handleRate = (rating) => {
    if (!disabled) {
      onRate(rating);
    }
  };

  const baseClasses =
    "rounded-md px-6 py-3 text-lg font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 md:text-xl";

  return (
    <div className="my-5 flex animate-slide-up flex-wrap justify-center gap-4">
      <button
        className={`${baseClasses} bg-neutral-800 text-white hover:scale-105 hover:bg-neutral-700`}
        onClick={() => handleRate("ruim")}
        disabled={disabled}
        aria-label="Avaliar piada como péssima"
        title="Avaliar como péssima"
      >
        🤮 Péssima
      </button>
      <button
        className={`${baseClasses} bg-neutral-600 text-white hover:scale-105 hover:bg-neutral-500`}
        onClick={() => handleRate("medio")}
        disabled={disabled}
        aria-label="Avaliar piada como meh"
        title="Avaliar como meh"
      >
        😐 Meh...
      </button>
      <button
        className={`${baseClasses} bg-accent text-black hover:scale-105 hover:bg-accent-hover`}
        onClick={() => handleRate("boa")}
        disabled={disabled}
        aria-label="Avaliar piada como genial e salvar"
        title="Avaliar como genial e salvar"
      >
        🤣 Genial!
      </button>
    </div>
  );
}
