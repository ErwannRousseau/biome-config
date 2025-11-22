import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import pc from "picocolors";

export async function copyBiomeConfig(): Promise<void> {
  const sourcePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "biome.json",
  );

  const destinationPath = path.resolve(process.cwd(), "biome.json");

  if (fs.existsSync(destinationPath)) {
    p.log.warning(`${pc.yellow("biome.json")} already exists, skipping...`);
    return;
  }

  const spinner = p.spinner();
  spinner.start("Copying biome.json");

  try {
    fs.copyFileSync(sourcePath, destinationPath);
    spinner.stop(`${pc.green("✓")} biome.json configured`);
  } catch (error) {
    spinner.stop(`${pc.red("✗")} Failed to copy biome.json`);
    throw error;
  }
}
