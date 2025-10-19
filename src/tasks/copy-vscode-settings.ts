import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { mergeJsonSettings, readJsonFile, writeJsonFile } from "../utils";

export async function copyVSCodeSettings(): Promise<void> {
  const sourcePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    ".vscode",
    "settings.json",
  );

  const vscodeDir = path.resolve(process.cwd(), ".vscode");
  const destinationPath = path.resolve(vscodeDir, "settings.json");

  const spinner = p.spinner();
  spinner.start("Configuring VS Code settings");

  try {
    // Ensure .vscode directory exists
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    const newSettings = readJsonFile(sourcePath);

    if (fs.existsSync(destinationPath)) {
      const existingSettings = readJsonFile(destinationPath);
      const mergedSettings = mergeJsonSettings(existingSettings, newSettings);
      writeJsonFile(destinationPath, mergedSettings);
      spinner.stop(
        `${pc.green("✓")} VS Code settings merged with existing configuration`,
      );
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
      spinner.stop(`${pc.green("✓")} VS Code settings configured`);
    }
  } catch (error) {
    spinner.stop(`${pc.red("✗")} Failed to configure VS Code settings`);
    throw error;
  }
}
