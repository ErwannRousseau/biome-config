import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { readJsonFile, writeJsonFile } from "../utils";

// biome-ignore lint/suspicious/noExplicitAny: Generic JSON merge utility
const mergeJsonSettings = (existing: any, newSettings: any): any => {
  const merged = { ...existing };

  for (const key in newSettings) {
    if (
      typeof newSettings[key] === "object" &&
      !Array.isArray(newSettings[key]) &&
      newSettings[key] !== null
    ) {
      merged[key] = mergeJsonSettings(existing[key] || {}, newSettings[key]);
    } else {
      merged[key] = newSettings[key];
    }
  }

  return merged;
};

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
