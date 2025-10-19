#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const args = process.argv.slice(2);

if (args.length === 0) {
  // biome-ignore lint/suspicious/noConsole: User input validation <explanation>
  console.log(
    chalk.red("Error: You need to specify a script to run (setup or update)."),
  );
  process.exit(1);
}

const script = args[0] || "";
const allowedScripts = ["setup", "update"];

if (!allowedScripts.includes(script)) {
  // biome-ignore lint/suspicious/noConsole: User input validation <explanation>
  console.log(
    chalk.red(`Error: Invalid “${script}” script. Use “setup” or “update”.`),
  );
  process.exit(1);
}

const scriptPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  `${script}.js`,
);

try {
  execFileSync("node", [scriptPath, ...args.slice(1)], { stdio: "inherit" });
} catch (error) {
  // biome-ignore lint/suspicious/noConsole: User input validation <explanation>
  console.log(chalk.red(`Error executing ${script} script: `, error));
  process.exit(1);
}
