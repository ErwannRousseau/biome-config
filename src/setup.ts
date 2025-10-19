#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import {
  detectPackageManager,
  installBiomeLatest,
  packageJsonPath,
  readJsonFile,
  runFormart,
  writeJsonFile,
} from "./utils";

const copyBiomeConfig = () => {
  const sourcePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "biome.json",
  );

  const destinationPath = path.resolve(process.cwd(), "biome.json");
  if (fs.existsSync(destinationPath)) {
    // biome-ignore lint/suspicious/noConsole: User input validation
    console.log(chalk.yellow("🌝 biome.json already exists, skipping copy."));
    return;
  }

  fs.copyFileSync(sourcePath, destinationPath);
  // biome-ignore lint/suspicious/noConsole: User input validation
  console.log(chalk.green("✍️  biome.json added successfully."));
};

const addScriptsToPackageJson = async () => {
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
      // biome-ignore lint/suspicious/noConsole: User input validation
      console.log(
        chalk.red(
          "🚨 Invalid response. Please answer with 'Y', 'n' or 'Enter'.",
        ),
      );
    }
  } while (answer !== "y" && answer !== "n" && answer !== "");

  if (answer === "n") {
    // biome-ignore lint/suspicious/noConsole: User input validation
    console.log(chalk.yellow("🌝 Skipping script addition."));
    rl.close();
    return;
  }

  const packageJson = readJsonFile(packageJsonPath);

  const newScripts = {
    check: "biome check",
    "check:fix": "biome check --fix",
    format: "biome format --fix",
    lint: "biome lint --fix",
  };

  packageJson.scripts = { ...packageJson.scripts, ...newScripts };
  writeJsonFile(packageJsonPath, packageJson);
  // biome-ignore lint/suspicious/noConsole: User input validation
  console.log(chalk.green("✍️  Scripts added to package.json."));
  rl.close();
};

const main = async () => {
  const packageManager = detectPackageManager();
  installBiomeLatest(packageManager);
  copyBiomeConfig();
  await addScriptsToPackageJson();
  runFormart();
  // biome-ignore lint/suspicious/noConsole: User input validation
  console.log(chalk.green("🎉 Biome setup completed successfully!"));
};

main();
