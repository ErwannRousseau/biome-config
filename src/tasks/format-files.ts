import { execSync } from "node:child_process";
import * as p from "@clack/prompts";
import pc from "picocolors";

export async function formatFiles(): Promise<void> {
  const spinner = p.spinner();
  spinner.start("Formatting configuration files");

  try {
    execSync("biome format --fix ./biome.json ./package.json", {
      stdio: "ignore",
    });
    spinner.stop(`${pc.green("✓")} Files formatted`);
  } catch {
    spinner.stop(`${pc.red("✗")} Failed to format files`);
    // Non-critical error, continue anyway
  }
}
