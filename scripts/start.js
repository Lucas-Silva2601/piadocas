#!/usr/bin/env node
/**
 * Inicia a aplicação (Next.js) em background e abre no navegador.
 * Uso: npm run app:start | node scripts/start.js
 */
const { spawn, spawnSync, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");
const http = require("http");

const root = path.resolve(__dirname, "..");
const pidFile = path.join(__dirname, "server.pid");
const logsDir = path.join(root, "logs");
const outLog = path.join(logsDir, "server.out.log");
const errLog = path.join(logsDir, "server.err.log");
const PORT = 3000;
const APP_URL = `http://localhost:${PORT}`;

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

function portInUse(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: "127.0.0.1" });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

function waitForServer(url, timeoutMs = 60_000) {
  const started = Date.now();
  return new Promise((resolve) => {
    const attempt = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve(true);
      });
      req.on("error", () => {
        if (Date.now() - started > timeoutMs) {
          resolve(false);
        } else {
          setTimeout(attempt, 1000);
        }
      });
      req.setTimeout(2000, () => req.destroy());
    };
    attempt();
  });
}

async function main() {
  // Se já estiver rodando, só abre o navegador
  if (fs.existsSync(pidFile)) {
    const oldPid = parseInt(fs.readFileSync(pidFile, "utf8").trim(), 10);
    if (oldPid && isAlive(oldPid)) {
      console.log(`[!] A aplicação já está rodando (PID ${oldPid}).`);
      openBrowser(APP_URL);
      return;
    }
    fs.rmSync(pidFile, { force: true });
  }

  // Detecta porta ocupada (ex.: servidor órfão de execução anterior)
  if (await portInUse(PORT)) {
    console.error(`[X] A porta ${PORT} já está em uso por outro processo.`);
    console.error("    Encerre esse processo ou use: npm run app:stop");
    process.exit(1);
  }

  // Instala dependências se necessário
  if (!fs.existsSync(path.join(root, "node_modules"))) {
    console.log("[..] Instalando dependências...");
    spawnSync("npm", ["install"], { cwd: root, shell: true, stdio: "inherit" });
  }

  // Usa o build de produção se existir; caso contrário, roda em modo dev
  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const mode = fs.existsSync(path.join(root, ".next", "BUILD_ID")) ? "start" : "dev";

  fs.mkdirSync(logsDir, { recursive: true });
  const out = fs.openSync(outLog, "a");
  const err = fs.openSync(errLog, "a");

  const child = spawn(process.execPath, [nextBin, mode], {
    cwd: root,
    detached: true,
    stdio: ["ignore", out, err],
  });
  child.unref();

  fs.writeFileSync(pidFile, String(child.pid));
  console.log(`[OK] Aplicação iniciada em modo ${mode} (PID ${child.pid})`);

  const ready = await waitForServer(APP_URL);
  if (ready) {
    console.log(`[OK] Servidor pronto em ${APP_URL} - abrindo no navegador...`);
    openBrowser(APP_URL);
  } else {
    console.error("[X] O servidor não respondeu em 60s. Verifique os logs:");
    console.error(`    ${errLog}`);
    process.exit(1);
  }
}

main();
