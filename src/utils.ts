import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";

export const packageJsonPath = path.resolve(process.cwd(), "package.json");

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
