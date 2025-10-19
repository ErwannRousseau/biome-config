import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";

export const packageJsonPath = path.resolve(process.cwd(), "package.json");

export const installBiomeLatest = (packageManager: string) => {
  // biome-ignore lint/suspicious/noConsole: User input validation
  console.log(
    pc.blue(`🦋 Installing @biomejs/biome using ${packageManager}...`),
  );

  const command = {
    bun: "bun add --dev --exact @biomejs/biome@latest",
    npm: "npm install --save-dev --save-exact @biomejs/biome@latest",
    pnpm: "pnpm add --save-dev --save-exact @biomejs/biome@latest",
    yarn: "yarn add --dev --exact @biomejs/biome@latest",
  }[packageManager];

  if (!command) {
    console.error(pc.red(`Unknown package manager: ${packageManager}`));
    process.exit(1);
  }

  execSync(command, { stdio: "inherit" });
};

export const detectPackageManager = (): string => {
  const hasYarn = fs.existsSync(path.join(process.cwd(), "yarn.lock"));
  const hasPnpm = fs.existsSync(path.join(process.cwd(), "pnpm-lock.yaml"));
  const hasBun = fs.existsSync(path.join(process.cwd(), "bun.lockb"));

  if (hasYarn) return "yarn";
  if (hasPnpm) return "pnpm";
  if (hasBun) return "bun";
  return "npm";
};

export const readJsonFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    p.log.error(pc.red(`File not found: ${filePath}`));
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// biome-ignore lint/suspicious/noExplicitAny: JSON.stringify first argument expects any
export const writeJsonFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const runFormart = () => {
  execSync("biome format --fix ./biome.json ./package.json", {
    stdio: "inherit",
  });
};

// biome-ignore lint/suspicious/noExplicitAny: Generic JSON merge utility
export const mergeJsonSettings = (existing: any, newSettings: any): any => {
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
