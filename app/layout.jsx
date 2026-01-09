import "./globals.css";

export const metadata = {
  title: "Piada com Cianeto",
  description: "Piadas tão ruins que são boas... ou tão ruins que te deixarão sem amigos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col bg-black font-mono text-white antialiased">
        {children}
      </body>
    </html>
  );
}
