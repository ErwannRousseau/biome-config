import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/bin.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  clean: true,
});
