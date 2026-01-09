#!/usr/bin/env node
/**
 * Encerra a aplicação Next.js iniciada pelo script start.js.
 * Uso: npm run app:stop | node scripts/stop.js
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const pidFile = path.join(__dirname, "server.pid");

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

if (!fs.existsSync(pidFile)) {
  console.log("[i] Nenhuma aplicação em execução (arquivo server.pid não encontrado).");
  process.exit(0);
}

const pid = parseInt(fs.readFileSync(pidFile, "utf8").trim(), 10);

if (pid && isAlive(pid)) {
  if (process.platform === "win32") {
    // /T encerra toda a árvore de processos (workers do Next)
    spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    try {
      // No POSIX, o processo foi iniciado detached: kill no grupo
      process.kill(-pid, "SIGTERM");
    } catch {
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        // processo já finalizado
      }
    }
  }
  console.log(`[OK] Aplicação encerrada (PID ${pid}).`);
} else {
  console.log("[i] A aplicação já não estava em execução.");
}

fs.rmSync(pidFile, { force: true });
