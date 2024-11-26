import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";

export const packageJsonPath = path.resolve(process.cwd(), "package.json");

export const installBiomeLatest = (packageManager: string) => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(
    chalk.blue(`🦋 Installing @biomejs/biome using ${packageManager}...`),
  );

  const command = {
    npm: "npm install --save-dev --save-exact @biomejs/biome@latest",
    yarn: "yarn add --dev --exact @biomejs/biome@latest",
    pnpm: "pnpm add --save-dev --save-exact @biomejs/biome@latest",
    bun: "bun add --dev --exact @biomejs/biome@latest",
  }[packageManager];

  if (!command) {
    console.error(chalk.red(`Unknown package manager: ${packageManager}`));
    process.exit(1);
  }

  execSync(command, { stdio: "inherit" });
};

export const detectPackageManager = () => {
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
    console.error(chalk.red(`🚨 File not found for this path: '${filePath}'`));
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
