<div align="center">

# 🎭 Piadocas

### Gerador de piadas de humor ácido com IA

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Ollama Cloud](https://img.shields.io/badge/Ollama_Cloud-API-FFB454?logo=ollama&logoColor=black)](https://docs.ollama.com/cloud)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Sobre o projeto

O **Piadocas** é uma aplicação full-stack que usa inteligência artificial para gerar piadas de humor ácido e politicamente incorreto a partir de temas definidos pelo usuário. O foco do projeto está em uma experiência simples e responsiva, com geração de conteúdo em tempo real, avaliação das piadas e um cofre de favoritos persistido no navegador.

O backend é composto por API routes do próprio Next.js, que fazem a ponte segura entre o frontend e o [Ollama Cloud](https://docs.ollama.com/cloud) — a chave de API nunca chega ao navegador.

## ✨ Funcionalidades

- 🎲 **Geração por tema** — o usuário define o tema (ou deixa em branco e recebe um tema padrão aleatório)
- ⭐ **Avaliação e favoritos** — avalie a piada (Péssima, Meh ou Genial); as geniais são salvas no localStorage
- 🗑️ **Gerenciamento da galeria** — liste e remova piadas salvas
- 🔔 **Notificações de feedback** — toasts animados para cada ação
- 📱 **Responsivo** — layout adaptado para desktop e mobile
- 🎨 **Identidade visual** — tema dark com accent vermelho, tipografia monoespaçada e animações sutis
- 🛡️ **Seguro por padrão** — chamada à IA acontece 100% no servidor

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Frontend | [React 19](https://react.dev/) |
| Estilo | [Tailwind CSS 4](https://tailwindcss.com/) |
| Backend | API Routes do Next.js (Route Handlers) |
| IA | [Ollama Cloud](https://docs.ollama.com/cloud) — modelo `gemma4:31b` |
| Persistência | `localStorage` |

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18.18+
- Chave de API do Ollama Cloud — crie em [ollama.com/settings/keys](https://ollama.com/settings/keys)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/piadocas.git
cd piadocas

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env e cole sua chave em OLLAMA_API_KEY

# 4. Iniciar (abre direto no navegador)
npm run app:start
```

A aplicação sobe em [http://localhost:3000](http://localhost:3000).

### Comandos disponíveis

| Comando | O que faz |
|---|---|
| `npm run app:start` | Sobe o servidor em background e abre no navegador |
| `npm run app:stop` | Encerra a aplicação |
| `npm run app:restart` | Reinicia a aplicação |
| `npm run dev` | Modo desenvolvimento com hot reload |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção |

> Os scripts são Node.js puros (zero dependências) e funcionam em Windows, macOS e Linux. Logs ficam em `logs/`.

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `OLLAMA_API_KEY` | ✅ | Chave de API do Ollama Cloud |
| `OLLAMA_MODEL` | ❌ | Modelo usado (padrão: `gemma4:31b`) |

## 🔌 API

### `POST /api/jokes/generate`

Gera uma piada com base em um tema.

```bash
curl -X POST http://localhost:3000/api/jokes/generate \
  -H "Content-Type: application/json" \
  -d '{"tema": "política"}'
```

**Resposta (200)**
```json
{ "piada": "...", "tema": "política" }
```

**Resposta de erro**
```json
{ "erro": "mensagem de erro" }
```

### `GET /api/health`

Health check da aplicação → `{ "status": "ok" }`

## 📁 Estrutura

```
piadocas/
├── app/                        # App Router
│   ├── layout.jsx              # Layout raiz + fonte monoespaçada
│   ├── page.jsx                # Página principal (client component)
│   ├── globals.css             # Tailwind 4 + tema da aplicação
│   └── api/
│       ├── jokes/generate/     # POST - geração de piadas
│       └── health/             # GET - health check
├── components/                 # Componentes React reutilizáveis
├── lib/
│   ├── ollama.js               # Integração com o Ollama Cloud (server-side)
│   ├── api.js                  # Cliente das API routes
│   └── storage.js              # Persistência no localStorage
├── scripts/                    # Automação start/stop/restart
├── .env.example
└── README.md
```

## ⚙️ Decisões técnicas

- **IA no servidor** — a chamada ao Ollama Cloud vive em uma route handler; a chave secreta nunca é exposta ao cliente nem ao bundle do browser.
- **Formato OpenAI-compatível** — o Ollama Cloud expõe `/v1/chat/completions`, o que mantém a integração simples e portável para outros provedores.
- **SSR seguro com estado de cliente** — a página usa client components com hidratação controlada (ex.: ano do rodapé resolvido via `useEffect` para evitar divergência servidor/cliente).
- **Scripts de operação em Node.js** — start/stop/restart implementados com os módulos nativos do Node (`child_process`, `net`, `http`), sem dependências extras, cross-platform (Windows/macOS/Linux) e integrados ao fluxo npm.
- **Resiliência** — timeout de 30s com `AbortController`, retries de erro amigáveis e fallback de mensagens por status HTTP.

## 📄 Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <sub>Desenvolvido com ❤️ e mau humor — 2026</sub>
</div>

## ⚠️ Aviso

Este projeto contém humor ácido e politicamente incorreto. Use com responsabilidade.
