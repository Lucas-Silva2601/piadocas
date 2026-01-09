export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-md border border-red-500 bg-red-950 p-4 text-red-400">
      <p>⚠️ {message}</p>
    </div>
  );
}
