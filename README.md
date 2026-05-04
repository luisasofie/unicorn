# EXT:unicorn - A magical unicorn for the TYPO3 backend

Adds an interactive, animated unicorn that gallops across the TYPO3 backend — complete with sparkle trails, physics-based jumping, and a handful of easter eggs.

## Features

- Unicorn runs and bounces across the bottom of the TYPO3 backend
- Physics-based jumping with adjustable height
- Sparkle trail of stars, hearts, and butterflies following the unicorn
- Upside-down mode: unicorn flips and runs across the top of the screen
- Double-tap Up: triggers a full-screen star shower and explosion burst
- Fully keyboard-driven — no clicks required
- Works across all TYPO3 backend iframes
- No configuration, no database records — install and it just works

## Keyboard Controls

| Key | Action |
|---|---|
| `Ctrl / Cmd + U` | Toggle unicorn on / off |
| `Ctrl / Cmd + .` | Pause / resume |
| `Arrow Up` | Jump (increases jump height with each press) |
| `Arrow Up` × 2 (quickly) | Star shower + explosion burst |
| `Arrow Down` | Toggle upside-down mode (runs on the ceiling) |
| `Arrow Left / Right` | Decrease / increase running speed |

## Easter Eggs

**Star shower** (`Arrow Up` pressed twice quickly): launches five sparkle bursts randomly across the entire screen, plus a radial explosion of 60 stars from the unicorn's current position.

**Upside-down mode** (`Arrow Down`): the unicorn flips upside down and gallops across the top of the backend. Sparkles trail downward from the ceiling. Jumping still works — the unicorn bounces away from the ceiling and is pulled back up. Press `Arrow Down` again to return to the floor.

## Installation

Install via Composer:

```bash
composer req luisasofie/unicorn
```

Then activate the extension:

```bash
vendor/bin/typo3 extension:activate unicorn
```

Or install and activate via the TYPO3 Extension Manager.

## Requirements

- TYPO3 14.x
- `typo3/cms-backend`
- `typo3/cms-core`

## Changelog

### 1.0.1
- Added upside-down mode: unicorn runs across the top of the backend when pressing `Arrow Down`, with mirrored jump physics and sparkle trail
- Added double-tap `Arrow Up` easter egg: triggers a full-screen star shower combined with a radial explosion burst from the unicorn's position
- Jumping now also works in upside-down mode

### 1.0.0
- Initial release: animated unicorn running across the TYPO3 backend with sparkle trail, physics-based jumping, and keyboard controls

## Credits

This extension was created by Luisa Sofie Faßbender in 2026.

[Find more TYPO3 extensions](https://extensions.typo3.org) that help deliver value in TYPO3 projects.
