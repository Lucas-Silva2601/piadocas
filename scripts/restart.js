#!/usr/bin/env node
/**
 * Reinicia a aplicação: encerra se estiver rodando e inicia novamente.
 * Uso: npm run app:restart | node scripts/restart.js
 */
const { spawnSync } = require("child_process");
const path = require("path");

console.log("[..] Reiniciando a aplicação...");

spawnSync(process.execPath, [path.join(__dirname, "stop.js")], { stdio: "inherit" });
spawnSync(process.execPath, [path.join(__dirname, "start.js")], { stdio: "inherit" });
