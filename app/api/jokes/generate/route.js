import { NextResponse } from "next/server";
import { generateJoke, OllamaError } from "@/lib/ollama";

/**
 * POST /api/jokes/generate
 * Gera uma piada com base em um tema (opcional).
 */
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const tema = typeof body.tema === "string" ? body.tema : null;

  try {
    const piada = await generateJoke(tema);
    const temaUsado = tema && tema.trim() ? tema.trim() : "tema padrão";

    return NextResponse.json({ piada, tema: temaUsado });
  } catch (error) {
    if (error instanceof OllamaError) {
      return NextResponse.json({ erro: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { erro: `Erro interno ao gerar piada: ${error.message}` },
      { status: 500 }
    );
  }
}
