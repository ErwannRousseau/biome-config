import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const targetConfigPath = path.resolve(process.cwd(), "biome.json");

const defaultBiomeConfig = {
  $schema: "./node_modules/@biomejs/biome/configuration_schema.json",
  extends: ["@r2/biome-config"],
};

try {
  execSync("pnpm add --save-dev --save-exact @biomejs/biome");
  console.log("@biomejs/biome installé avec succès dans package.json.");

  const biomeConfigContent = JSON.stringify(defaultBiomeConfig, null, 2);

  fs.writeFileSync(targetConfigPath, biomeConfigContent);
  console.log("biome.json créé avec succès.");
} catch (error) {
  console.error("Erreur lors de l'installation de @r2/biome-config :", error);
}
