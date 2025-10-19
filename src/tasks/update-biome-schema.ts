import * as fs from "node:fs";
import * as path from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { packageJsonPath, readJsonFile, writeJsonFile } from "../utils";

export async function updateBiomeSchema(): Promise<void> {
  const spinner = p.spinner();
  spinner.start("Updating biome.json schema");

  try {
    const packageJson = readJsonFile(packageJsonPath);

    let biomeVersion = packageJson.devDependencies["@biomejs/biome"];
    if (!biomeVersion) {
      spinner.stop(
        `${pc.yellow("⚠")} @biomejs/biome not found in devDependencies`,
      );
      return;
    }

    if (biomeVersion.startsWith("^")) {
      biomeVersion = biomeVersion.substring(1);
    }

    const biomeJsonPath = path.resolve(process.cwd(), "biome.json");

    if (!fs.existsSync(biomeJsonPath)) {
      spinner.stop(`${pc.yellow("⚠")} biome.json not found`);
      return;
    }

    const biomeJson = readJsonFile(biomeJsonPath);
    biomeJson.$schema = `https://biomejs.dev/schemas/${biomeVersion}/schema.json`;
    writeJsonFile(biomeJsonPath, biomeJson);

    spinner.stop(
      `${pc.green("✓")} Schema updated to version ${pc.cyan(biomeVersion)}`,
    );
  } catch (error) {
    spinner.stop(`${pc.red("✗")} Failed to update schema`);
    throw error;
  }
}
