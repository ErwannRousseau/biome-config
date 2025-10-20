import { execSync } from "node:child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { detectPackageManager } from "../utils";

export async function installBiome(): Promise<void> {
  const packageManager = detectPackageManager();
  const spinner = p.spinner();

  spinner.start(
    `Installing ${pc.cyan("@biomejs/biome")} using ${pc.yellow(packageManager)}`,
  );

  const command = {
    bun: "bun add --dev --exact @biomejs/biome@latest",
    npm: "npm install --save-dev --save-exact @biomejs/biome@latest",
    pnpm: "pnpm add --save-dev --save-exact @biomejs/biome@latest",
    yarn: "yarn add --dev --exact @biomejs/biome@latest",
  }[packageManager];

  if (!command) {
    spinner.stop(`Unknown package manager: ${packageManager}`);
    p.cancel("Installation cancelled");
    process.exit(1);
  }

  try {
    execSync(command, { stdio: "ignore" });
    spinner.stop(`${pc.green("✓")} Biome installed successfully`);
  } catch (error) {
    spinner.stop(`${pc.red("✗")} Failed to install Biome`);
    throw error;
  }
}
