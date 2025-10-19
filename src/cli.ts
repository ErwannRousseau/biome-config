#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { setupCommand } from "./commands/setup";
import { updateCommand } from "./commands/update";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8"),
);

const program = new Command();

program
  .name("biome-config")
  .description("Setup and manage Biome configuration")
  .version(packageJson.version);

program
  .command("setup")
  .description("Setup Biome in your project")
  .option("--skip-vscode", "Skip VS Code settings configuration")
  .option("--skip-scripts", "Skip npm scripts addition")
  .option("-y, --yes", "Accept all defaults without prompts")
  .action(setupCommand);

program
  .command("update")
  .description("Update Biome to the latest version")
  .action(updateCommand);

// Show help if no command provided
if (process.argv.length === 2) {
  program.help();
}

program.parse();
