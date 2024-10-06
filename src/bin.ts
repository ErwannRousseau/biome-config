#!/usr/bin/env node

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const detectPackageManager = (): string => {
  const hasYarn = fs.existsSync(path.join(process.cwd(), "yarn.lock"));
  const hasPnpm = fs.existsSync(path.join(process.cwd(), "pnpm-lock.yaml"));
  const hasBun = fs.existsSync(path.join(process.cwd(), "bun.lockb"));

  if (hasYarn) return "yarn";
  if (hasPnpm) return "pnpm";
  if (hasBun) return "bun";
  return "npm";
};

const installBiome = (packageManager: string) => {
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(
    chalk.blue(`🦋 Installing @biomejs/biome using ${packageManager}...`),
  );

  const command = {
    npm: "npm install --save-dev --save-exact @biomejs/biome",
    yarn: "yarn add --dev --exact @biomejs/biome",
    pnpm: "pnpm add --save-dev --save-exact @biomejs/biome",
    bun: "bun add --dev --exact @biomejs/biome",
  }[packageManager];

  if (!command) {
    console.error(chalk.red(`Unknown package manager: ${packageManager}`));
    process.exit(1);
  }

  execSync(command, { stdio: "inherit" });
};

const copyBiomeConfig = () => {
  const sourcePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "biome.json",
  );
  const destinationPath = path.resolve(process.cwd(), "biome.json");

  if (fs.existsSync(destinationPath)) {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log(chalk.yellow("🌝 biome.json already exists, skipping copy."));
    return;
  }

  fs.copyFileSync(sourcePath, destinationPath);
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(chalk.green("✍️  biome.json added successfully."));
};

const addScriptsToPackageJson = async () => {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error(
      chalk.red("🚨 No package.json found in the current directory."),
    );
    process.exit(1);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(
        "Do you want to add the following scripts to your package.json? (Y/n)\n" +
          `  - check: "biome check"\n` +
          `  - check:fix: "biome check --fix"\n` +
          `  - format: "biome format --fix"\n` +
          `  - lint: "biome lint --fix"\n`,
        (answer) => {
          resolve(answer.trim().toLowerCase());
        },
      );
    });
  };

  let answer: string;
  do {
    answer = await askQuestion();
    if (answer !== "y" && answer !== "n" && answer !== "") {
      // biome-ignore lint/suspicious/noConsoleLog:
      console.log(
        chalk.red(
          "🚨 Invalid response. Please answer with 'Y', 'n' or 'Enter'.",
        ),
      );
    }
  } while (answer !== "y" && answer !== "n" && answer !== "");

  if (answer === "n") {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log(chalk.yellow("🌝 Skipping script addition."));
    rl.close();
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const newScripts = {
    check: "biome check",
    "check:fix": "biome check --fix",
    format: "biome format --fix",
    lint: "biome lint --fix",
  };

  packageJson.scripts = { ...packageJson.scripts, ...newScripts };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(chalk.green("✍️  Scripts added to package.json."));
  rl.close();
};

const main = async () => {
  const packageManager = detectPackageManager();
  installBiome(packageManager);
  copyBiomeConfig();
  await addScriptsToPackageJson();
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(chalk.green("🎉 Biome setup completed successfully!"));
};

main();
