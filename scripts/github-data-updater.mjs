/**
 * GitHub Data Updater - Runs continuously and updates github-data.json every 60 minutes
 * Usage: node scripts/github-data-updater.mjs
 * 
 * This script:
 * 1. Runs immediately on start
 * 2. Then schedules updates every 60 minutes
 * 3. Runs in background - no need to keep terminal open (on Unix) or can be run as Windows Service
 */

import { spawn } from "child_process";
import { setInterval } from "timers/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = join(__dirname, "generate-github-data.mjs");

const UPDATE_INTERVAL_MS = 60 * 60 * 1000; // 60 minutes

console.log("🚀 GitHub Data Updater started");
console.log(`   Script: ${SCRIPT_PATH}`);
console.log(`   Update interval: ${UPDATE_INTERVAL_MS / 1000 / 60} minutes`);
console.log("");

async function runGenerator() {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Running GitHub data generator...`);
  
  return new Promise((resolve, reject) => {
    const proc = spawn("node", [SCRIPT_PATH], {
      cwd: join(__dirname, ".."),
      stdio: "inherit",
      shell: true,
    });

    proc.on("close", (code) => {
      const elapsed = Date.now() - startTime;
      if (code === 0) {
        console.log(`[${new Date().toISOString()}] ✅ Update completed in ${(elapsed / 1000).toFixed(1)}s`);
        resolve();
      } else {
        console.error(`[${new Date().toISOString()}] ❌ Update failed with code ${code}`);
        resolve(); // Don't reject - we want to keep retrying
      }
    });

    proc.on("error", (err) => {
      console.error(`[${new Date().toISOString()}] ❌ Process error: ${err.message}`);
      resolve(); // Keep retrying even on error
    });
  });
}

async function main() {
  // Run immediately on startup
  await runGenerator();
  
  console.log("");
  console.log(`⏰ Next update in ${UPDATE_INTERVAL_MS / 1000 / 60} minutes...`);
  console.log("   Press Ctrl+C to stop");
  console.log("");

  // Then run every 60 minutes
  for await (const _ of setInterval(UPDATE_INTERVAL_MS)) {
    await runGenerator();
    console.log("");
    console.log(`⏰ Next update in ${UPDATE_INTERVAL_MS / 1000 / 60} minutes...`);
  }
}

main().catch(console.error);
