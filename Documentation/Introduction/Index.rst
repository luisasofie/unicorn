..  include:: /Includes.rst.txt

..  _introduction:

============
Introduction
============

..  _introduction-what:

What does it do?
================

The Unicorn extension adds a small, animated unicorn to the TYPO3 backend. Once
summoned with a keyboard shortcut, it gallops back and forth along the bottom
edge of the screen, leaving a trail of sparkles behind it. You can make it jump,
change its speed, send it running across the ceiling, and — if you know the right
key combination — set off a shower of stars across the whole screen.

The unicorn is purely decorative. It renders into an overlay that ignores all
pointer events, so it never intercepts a click and never blocks a backend
control. It stores nothing: no database records, no user settings, no cookies.
Reloading the backend removes it again.

..  _introduction-features:

Features
========

*   Unicorn runs and bounces along the bottom of the TYPO3 backend
*   Physics-based jumping with an adjustable jump height
*   Sparkle trail of stars, hearts and butterflies
*   Upside-down mode: the unicorn flips and runs across the top of the screen
*   Star shower easter egg
*   Fully keyboard-driven — no clicks required
*   Works across all TYPO3 backend iframes
*   No configuration and no database records — install and it just works

..  _introduction-how-it-works:

How it works
============

The extension registers a backend toolbar item
(:php:`LuisaSofie\Unicorn\Backend\ToolbarItems\UnicornToolbarItem`) whose only
job is to load the JavaScript module :file:`unicorn-runner.js` on every backend
page. The toolbar item itself renders no visible button.

The keyboard shortcuts are registered through the TYPO3 backend hotkey API with
the :js:`scope: 'all'` option, which is why they keep working no matter which
backend module or iframe currently has focus.

..  _introduction-support:

Requirements
============

*   TYPO3 14.x
*   PHP 8.2 or later
