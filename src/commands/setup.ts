import * as p from "@clack/prompts";
import pc from "picocolors";
import { addNpmScripts } from "../tasks/add-npm-scripts";
import { copyBiomeConfig } from "../tasks/copy-biome-config";
import { copyVSCodeSettings } from "../tasks/copy-vscode-settings";
import { formatFiles } from "../tasks/format-files";
import { installBiome } from "../tasks/install-biome";

interface SetupOptions {
  skipVscode?: boolean;
  skipScripts?: boolean;
  yes?: boolean;
}

export async function setupCommand(options: SetupOptions): Promise<void> {
  p.intro(pc.bgCyan(pc.black(" ⚡️ Biome Configuration Setup ")));

  let config = {
    scripts: !options.skipScripts,
    vscode: !options.skipVscode,
  };

  // Interactive prompts if not in --yes mode
  if (!options.yes) {
    const answers = await p.group(
      {
        scripts: () =>
          p.confirm({
            initialValue: true,
            message: "Add npm scripts (check, format, lint)?",
          }),
        vscode: () =>
          p.confirm({
            initialValue: true,
            message: "Add/update VS Code settings for Biome?",
          }),
      },
      {
        onCancel: () => {
          p.cancel("Setup cancelled");
          process.exit(0);
        },
      },
    );

    config = answers;
  }

  p.log.step("Starting Biome setup...");

  try {
    await installBiome();

    await copyBiomeConfig();

    if (config.vscode) {
      await copyVSCodeSettings();
    } else {
      p.log.info("Skipping VS Code settings");
    }

    if (config.scripts) {
      await addNpmScripts();
    } else {
      p.log.info("Skipping npm scripts");
    }

    await formatFiles();

    p.outro(pc.green("🎉 Biome setup completed successfully!"));
  } catch (error) {
    p.log.error(pc.red("Setup failed"));
    if (error instanceof Error) {
      p.log.error(error.message);
    }
    process.exit(1);
  }
}
