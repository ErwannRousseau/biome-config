#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import {
  detectPackageManager,
  installBiomeLatest,
  packageJsonPath,
  readJsonFile,
  runFormart,
  writeJsonFile,
} from "./utils";

const updateBiomeSchema = () => {
  const packageJson = readJsonFile(packageJsonPath);

  let biomeVersion = packageJson.devDependencies["@biomejs/biome"];
  if (biomeVersion.startsWith("^")) {
    biomeVersion = biomeVersion.substring(1);
  }

  const biomeJsonPath = path.resolve(process.cwd(), "biome.json");

  if (!fs.existsSync(biomeJsonPath)) {
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log(chalk.yellow("🌝 biome.json not found, skipping update."));
    process.exit(1);
  }

  const biomeJson = readJsonFile(biomeJsonPath);
  biomeJson.$schema = `https://biomejs.dev/schemas/${biomeVersion}/schema.json`;
  writeJsonFile(biomeJsonPath, biomeJson);
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(
    chalk.blue(
      `biome.json has been updated with schema version ${biomeVersion}.`,
    ),
  );
};

const main = async () => {
  const packageManager = detectPackageManager();
  installBiomeLatest(packageManager);
  updateBiomeSchema();
  runFormart();
  // biome-ignore lint/suspicious/noConsoleLog:
  console.log(chalk.green("🎉 Biome updated successfully!"));
};

main();
