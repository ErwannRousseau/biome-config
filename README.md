# Biome Config

A simple configuration utility for [Biome.js](https://biomejs.dev/), the best linter/formatter for JavaScript.

![CI](https://github.com/erwannrousseau/biome-config/workflows/CI/badge.svg)

## Usage

### For new projects

In your project root, execute the following command:

```bash
npx biome-config setup
```

This command will:

- Install `@biomejs/biome`.
- Create a `biome.json` file in your project root with a complete configuration ready to work.

You will be prompted to add custom scripts to your `package.json` file to run `biome.js` commands more easily.

### For updating your configuration

If you already have a `biome.json` file in your project root, you can update it by executing the following command:

```bash
npx biome-config update
```

This command will:

- Update the latest version of `@biomejs/biome`.
- Update your `biome.json` file with the latest `$schema` version.

## What's Next?

To use `biome.js` as your default linter and formatter, you should install the following VS Code extension:

- [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

Then, add the following configuration to your `settings.json` or `.vscode/settings.json` file:

```json
// BIOME
"[typescript][typescriptreact]": {
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
},
```

> [!TIP]
> Biome supports the following languages:
>
> javascript, javascriptreact, typescript, typescriptreact, json, jsonc, css, graphql

### Now you are ready to go! 🚀

----

#### Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/ace7b3ef052fd531038fdff93079d573baea77ed.svg "Repobeats analytics image")
