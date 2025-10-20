import * as p from "@clack/prompts";
import pc from "picocolors";
import { packageJsonPath, readJsonFile, writeJsonFile } from "../utils";

export async function addNpmScripts(): Promise<void> {
  const spinner = p.spinner();
  spinner.start("Adding npm scripts");

  try {
    const packageJson = readJsonFile(packageJsonPath);

    const newScripts = {
      check: "biome check",
      "check:fix": "biome check --fix",
      format: "biome format --fix",
      lint: "biome lint --fix",
    };

    packageJson.scripts = { ...packageJson.scripts, ...newScripts };
    writeJsonFile(packageJsonPath, packageJson);

    spinner.stop(`${pc.green("✓")} npm scripts added`);
  } catch (error) {
    spinner.stop(`${pc.red("✗")} Failed to add npm scripts`);
    throw error;
  }
}
