..  include:: /Includes.rst.txt

..  _editor:

=================
Using the unicorn
=================

Target group: **Editors**, **Administrators**

The unicorn is controlled entirely with the keyboard. The shortcuts are
registered globally and work from any backend module, including inside iframes.

..  _editor-shortcuts:

Keyboard controls
=================

..  list-table::
    :header-rows: 1
    :widths: 30 70

    *   -   Key
        -   Action
    *   -   :kbd:`Ctrl + U` / :kbd:`Cmd + U`
        -   Summon or dismiss the unicorn
    *   -   :kbd:`Ctrl + .` / :kbd:`Cmd + .`
        -   Pause or resume the animation
    *   -   :kbd:`Arrow Up`
        -   Jump — each press also raises the jump height
    *   -   :kbd:`Arrow Up` twice, quickly
        -   Star shower easter egg
    *   -   :kbd:`Arrow Down`
        -   Toggle upside-down mode
    *   -   :kbd:`Arrow Left` / :kbd:`Arrow Right`
        -   Slow down or speed up

All shortcuts except :kbd:`Ctrl + U` only take effect while the unicorn is
visible.

..  _editor-jumping:

Jumping
=======

Each press of :kbd:`Arrow Up` makes the unicorn jump and increases the jump
height by five percent of the viewport height, up to a maximum of sixty
percent. The jump height only ever grows — it is not lowered again by dismissing
the unicorn, and it is reset only by reloading the backend.

A new jump can only be started once the unicorn has landed. Pressing
:kbd:`Arrow Up` mid-air still raises the jump height for the next jump, so a
burst of presses results in one low jump followed by a much higher one.

..  _editor-speed:

Changing the speed
==================

..  note::
    :kbd:`Arrow Right` and :kbd:`Arrow Left` do not map to a fixed direction.
    The arrow key that matches the unicorn's **current direction of travel**
    speeds it up, the opposite one slows it down. While the unicorn runs
    leftwards, :kbd:`Arrow Left` is therefore the accelerator.

The speed ranges from 0.5 to 8 pixels per frame in steps of 0.5, starting at 2.
When the unicorn reaches the edge of the screen it turns around and keeps its
speed — at which point the two keys swap roles.

..  _editor-upside-down:

Upside-down mode
================

:kbd:`Arrow Down` flips the unicorn upside down and moves it to the top of the
screen, where it gallops along the ceiling and its sparkles drift downwards.
Jumping still works: the unicorn pushes away from the ceiling and is pulled back
up towards it. Press :kbd:`Arrow Down` again to send it back to the floor.

Switching modes cancels a jump in progress and places the unicorn directly on
the floor or ceiling.

..  _editor-star-shower:

Star shower
===========

Pressing :kbd:`Arrow Up` twice within 400 milliseconds triggers the star shower:
five sparkle bursts of twelve stars each go off at random positions across the
viewport, together with a radial explosion of sixty stars from the unicorn's
current position. The burst particles fall under gravity and fade out after one
to two seconds.

..  _editor-notes:

Good to know
============

*   While the unicorn is visible, :kbd:`Arrow Up` and :kbd:`Arrow Down` no
    longer scroll the page — the extension suppresses this so the keys can
    control the unicorn. Dismiss the unicorn with :kbd:`Ctrl + U` to get
    scrolling back.
*   The unicorn is drawn in an overlay that ignores pointer events, so it never
    swallows a click on the backend underneath it.
*   Nothing is persisted. Speed, jump height and upside-down mode all reset when
    the backend is reloaded.
