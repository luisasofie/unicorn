# EXT:unicorn — A magical unicorn for the TYPO3 backend

[![Packagist](https://img.shields.io/packagist/v/luisasofie/unicorn.svg)](https://packagist.org/packages/luisasofie/unicorn)
[![License](https://img.shields.io/packagist/l/luisasofie/unicorn.svg)](LICENSE.txt)

Adds an interactive, animated unicorn that gallops across the TYPO3 backend —
complete with sparkle trails, physics-based jumping, and a handful of easter eggs.

## Features

- Unicorn runs and bounces across the bottom of the TYPO3 backend
- Physics-based jumping with adjustable jump height
- Sparkle trail of stars, hearts and butterflies following the unicorn
- Upside-down mode: unicorn flips and runs across the top of the screen
- Star shower easter egg
- Fully keyboard-driven — no clicks required
- Works across all TYPO3 backend iframes
- No configuration, no database records — install and it just works

## Installation

```bash
composer require luisasofie/unicorn
vendor/bin/typo3 extension:activate unicorn
```

Or install and activate via the TYPO3 Extension Manager.

## Keyboard controls

| Key | Action |
|---|---|
| `Ctrl / Cmd + U` | Summon / dismiss the unicorn |
| `Ctrl / Cmd + .` | Pause / resume |
| `Arrow Up` | Jump — each press also raises the jump height |
| `Arrow Up` × 2 (quickly) | Star shower easter egg |
| `Arrow Down` | Toggle upside-down mode (runs on the ceiling) |
| `Arrow Left / Right` | Slow down / speed up |

> **Note:** the arrow keys are relative to the unicorn's direction of travel. The
> key matching the current direction accelerates, the opposite one slows down —
> so while the unicorn runs leftwards, `Arrow Left` is the accelerator.

## Documentation

The full documentation lives in [`Documentation/`](Documentation/) and covers the
controls, the easter eggs and how the extension hooks into the backend.

## Requirements

- TYPO3 14.x
- PHP 8.2 or later

## Changelog

### 1.0.2
- Added the extension documentation under [`Documentation/`](Documentation/)
- Added `LICENSE.txt` and completed the package metadata (PHP requirement, keywords, homepage, author and support links)
- Corrected the documented arrow-key behaviour: the speed keys are relative to the unicorn's direction of travel

### 1.0.1
- Added upside-down mode: unicorn runs across the top of the backend when pressing `Arrow Down`, with mirrored jump physics and sparkle trail
- Added double `Arrow Up` easter egg: full-screen star shower combined with a radial explosion burst from the unicorn's position
- Jumping now also works in upside-down mode

### 1.0.0
- Initial release: animated unicorn running across the TYPO3 backend with sparkle trail, physics-based jumping and keyboard controls

## License

GPL-2.0-or-later — see [LICENSE.txt](LICENSE.txt).

## Credits

This extension was created by Luisa Sofie Faßbender in 2026.
Thanks to Jochen Roth for the brilliant support <3 

[Find more TYPO3 extensions](https://extensions.typo3.org) that help deliver value in TYPO3 projects.
