import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/setup.ts", "src/update.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
});
