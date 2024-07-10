# Installation Guide for @r2/biome-config

Ensure you have [pnpm](https://pnpm.io/) installed globally. If not, you can install it by running the following command:

```bash
npm install -g pnpm
```

## Step 1: Install @r2/biome-config Package

```bash
pnpm add @r2/biome-config
```

### Step 2: Configure biome.json

After installing `@r2/biome-config`, `@biomejs/biome` is automatically installed as a dev dependency.
And `biome.json` file will be automatically generated at the root of your project. This file contains the initial configuration needed for BiomeJS. Here's an example of what `biome.json` might look like:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": "@r2/biome-config"
  // Add additional configurations here as needed
}
```

Modify the configuration inside biome.json according to your project requirements.

### Step 3: Enjoy BiomeJS
