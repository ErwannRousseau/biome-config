---
"biome-config": minor
---

🎨 Major CLI refactoring with enhanced DX/UX

### ✨ New Features

- **Modern CLI Framework**: Migrated from custom implementation to Commander.js for better command handling
- **Beautiful Interactive Prompts**: Replaced readline with @clack/prompts for a stunning user experience
- **Lightweight Colors**: Switched from Chalk to picocolors (14x smaller, 2x faster)
- **Better Architecture**: Clean separation of concerns with commands/, tasks/, and utils/
- **Enhanced Help**: Auto-generated help messages with detailed option descriptions
- **Flexible Options**: New CLI flags (`--skip-vscode`, `--skip-scripts`, `-y/--yes`)

### 📦 Dependencies

- Added: `commander@^14.0.1`, `@clack/prompts@^0.11.0`, `picocolors@^1.1.1`
- Removed: `chalk@5.3.0` (replaced by picocolors)

### 🎯 Improvements

- Spinner animations during long operations
- Better error handling and messages
- Cleaner code structure for easier maintenance
- Smaller bundle size
- Faster execution
