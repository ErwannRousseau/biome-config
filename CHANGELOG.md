# biome-config

## 0.1.0

### Minor Changes

- [#91](https://github.com/ErwannRousseau/biome-config/pull/91) [`ea4a35d`](https://github.com/ErwannRousseau/biome-config/commit/ea4a35dfdaaed9a77bb2c2f306eb2ff8a6e71cc0) Thanks [@ErwannRousseau](https://github.com/ErwannRousseau)! - ### New features and improvements

  - Complete migration of the CLI to Commander.js for a more robust and flexible command-line experience.
  - Integration of @clack/prompts for a modern and interactive terminal UI (spinners, prompts, etc.).
  - Added automatic VS Code settings management and a JSON merge utility to simplify multi-project configuration.
  - Updated Biome to v2.3.0 and adapted related scripts.
  - Improved CI/CD workflows and release process (configuration files, release automation, etc.).

## 0.0.6

### Patch Changes

- 6464598: fix correct script execution for setup and update

## 0.0.5

### Patch Changes

- d113820: Added a new `update` executable script to automatically update the `@biomejs/biome` version and the `$schema` version in `biome.json`.

## 0.0.4

### Patch Changes

- b2d41f9: updated usage by renaming executable script to "setup"

## 0.0.2

### Patch Changes

- e6a4168: initial release
