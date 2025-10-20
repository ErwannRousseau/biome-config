import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/cli.ts", "src/setup.ts", "src/update.ts"],
<<<<<<< HEAD
  format: ["esm"],
  outDir: "dist",
=======
  external: [/^node:/, "commander", "chalk"],
  format: ["esm"],
  outDir: "dist",
  shims: true,
>>>>>>> afa3612 (refactor: CLI with Commander.js and enhance user experience with @clack/prompts (#87))
});
