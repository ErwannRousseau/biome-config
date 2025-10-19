import * as p from "@clack/prompts";
import pc from "picocolors";
import { formatFiles } from "../tasks/format-files";
import { installBiome } from "../tasks/install-biome";
import { updateBiomeSchema } from "../tasks/update-biome-schema";

export async function updateCommand(): Promise<void> {
  p.intro(pc.bgCyan(pc.black(" 🦋 Biome Update ")));

  p.log.step("Updating Biome to latest version...");

  try {
    await installBiome();

    await updateBiomeSchema();

    await formatFiles();

    p.outro(pc.green("🎉 Biome updated successfully!"));
  } catch (error) {
    p.log.error(pc.red("Update failed"));
    if (error instanceof Error) {
      p.log.error(error.message);
    }
    process.exit(1);
  }
}
