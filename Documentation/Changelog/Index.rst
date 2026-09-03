..  include:: /Includes.rst.txt

..  _changelog:

=========
Changelog
=========

..  _changelog-1-0-1:

1.0.1
=====

*   Added upside-down mode: the unicorn runs across the top of the backend when
    pressing :kbd:`Arrow Down`, with mirrored jump physics and a downward
    sparkle trail
*   Added the star shower easter egg on a double :kbd:`Arrow Up`: a full-screen
    shower combined with a radial explosion burst from the unicorn's position
*   Jumping now also works in upside-down mode
*   Performance: the star shower inserts its particles with a single
    :js:`DocumentFragment`, drops the drop-shadow filter and uses
    :css:`will-change` so the animation is composited on the GPU

..  _changelog-1-0-0:

1.0.0
=====

*   Initial release: animated unicorn running across the TYPO3 backend with
    sparkle trail, physics-based jumping and keyboard controls
