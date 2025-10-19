# Biome Config

![CI](https://github.com/erwannrousseau/biome-config/workflows/CI/badge.svg)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

A simple configuration utility for [Biome.js](https://biomejs.dev/), the best linter/formatter for JavaScript.

## Features

✨ **Interactive Setup** - Beautiful CLI prompts with @clack/prompts  
🎨 **Smart Merging** - Preserves existing VS Code settings  
📦 **Auto-detection** - Detects your package manager (npm, pnpm, yarn, bun)  
⚡ **Fast & Light** - Minimal dependencies, maximum performance  
🛠️ **Flexible** - Skip steps with CLI flags or use interactive mode

## Installation

```bash
npx biome-config setup
```

## Usage

### Setup Command

Set up Biome in your project with an interactive wizard:

```bash
npx biome-config setup
```

**Options:**

- `--skip-vscode` - Skip VS Code settings configuration
- `--skip-scripts` - Skip npm scripts addition
- `-y, --yes` - Accept all defaults without prompts

**What it does:**

1. Installs `@biomejs/biome` (latest version)
2. Creates a `biome.json` file with a complete configuration
3. Optionally adds/merges VS Code settings (`.vscode/settings.json`)
4. Optionally adds npm scripts (`check`, `check:fix`, `format`, `lint`)
5. Formats the configuration files

**Examples:**

```bash
# Interactive mode (recommended)
npx biome-config setup

# Non-interactive mode (accept all defaults)
npx biome-config setup --yes

# Skip VS Code settings
npx biome-config setup --skip-vscode

# Skip everything except Biome installation and config
npx biome-config setup --skip-vscode --skip-scripts
```

### Update Command

Update Biome to the latest version and sync your configuration:

```bash
npx biome-config update
```

**What it does:**

1. Updates `@biomejs/biome` to the latest version
2. Updates the `$schema` in your `biome.json` to match the installed version
3. Formats the configuration files

## VS Code Integration

If you accepted VS Code settings during setup, the configuration is already applied!

Otherwise, install the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) and add this to your `.vscode/settings.json`:

```json
{
  "[graphql][javascript][javascriptreact][json][jsonc][typescript][typescriptreact][css]": {
    "editor.codeActionsOnSave": {
      "source.action.useSortedAttributes.biome": "explicit",
      "source.action.useSortedKeys.biome": "explicit",
      "source.fixAll.biome": "explicit",
      "source.organizeImports.biome": "explicit"
    },
    "editor.defaultFormatter": "biomejs.biome"
  },
  "biome.enabled": true,
  "biome.requireConfiguration": true,
  "biome.suggestInstallingGlobally": false
}
```

> [!TIP]
> Biome supports the following languages:
>
> javascript, javascriptreact, typescript, typescriptreact, json, jsonc, css, graphql

## npm Scripts

If you accepted npm scripts during setup, you can use:

```bash
npm run check        # Check for errors and warnings
npm run check:fix    # Check and auto-fix issues
npm run format       # Format code
npm run lint         # Lint and auto-fix code
```

## CLI Help

```bash
# Show all commands
npx biome-config --help

# Show setup command options
npx biome-config setup --help

# Show version
npx biome-config --version
```

## Configuration

The generated `biome.json` includes:

- ✅ Recommended linting rules
- ✅ React domain support
- ✅ Test domain support
- ✅ Consistent formatting (2 spaces, 80 chars)
- ✅ Import organization
- ✅ Sorted attributes/keys
- ✅ VCS integration

## Now you are ready to go! 🚀

----

### Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/ace7b3ef052fd531038fdff93079d573baea77ed.svg "Repobeats analytics image")
