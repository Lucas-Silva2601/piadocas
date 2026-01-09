import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function JokeDisplay({ piada, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!piada) {
    return null;
  }

  return (
    <div className="animate-fade-in-fast rounded-md border border-accent bg-line p-4 leading-relaxed">
      <p className="break-words">{piada}</p>
    </div>
  );
}
