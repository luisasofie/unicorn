..  include:: /Includes.rst.txt

..  _installation:

============
Installation
============

Target group: **Administrators**

..  _installation-composer:

Installation with Composer
==========================

Install the extension with Composer:

..  code-block:: bash

    composer require luisasofie/unicorn

Then activate it:

..  code-block:: bash

    vendor/bin/typo3 extension:activate unicorn

..  _installation-classic:

Installation without Composer
=============================

Download the extension from the
`TYPO3 Extension Repository <https://extensions.typo3.org>`__ or from the
`GitHub repository <https://github.com/luisasofie/unicorn>`__ and place it in
:file:`typo3conf/ext/unicorn`. Then head over to the
:guilabel:`Admin Tools > Extensions` module and activate :guilabel:`Unicorn`.

..  _installation-verify:

Verifying the installation
==========================

There is nothing to configure. Open any backend page and press
:kbd:`Ctrl + U` (:kbd:`Cmd + U` on macOS) — the unicorn should appear at the
bottom of the screen and start running.

If nothing happens, clear the backend caches so the JavaScript module map is
rebuilt:

..  code-block:: bash

    vendor/bin/typo3 cache:flush
