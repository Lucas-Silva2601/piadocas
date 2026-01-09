export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-neutral-300">Criando sua piada mortal...</p>
    </div>
  );
}
