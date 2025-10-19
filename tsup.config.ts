import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/cli.ts", "src/setup.ts", "src/update.ts"],
  format: ["esm"],
  outDir: "dist",
});
