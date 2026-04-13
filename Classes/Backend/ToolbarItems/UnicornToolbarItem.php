<?php

declare(strict_types=1);

namespace LuisaSofie\Unicorn\Backend\ToolbarItems;

use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;
use TYPO3\CMS\Backend\Toolbar\ToolbarItemInterface;
use TYPO3\CMS\Core\Page\PageRenderer;

#[Autoconfigure(public: true)]
class UnicornToolbarItem implements ToolbarItemInterface
{
    public function __construct(
        private readonly PageRenderer $pageRenderer,
    ) {}

    public function checkAccess(): bool
    {
        return true;
    }

    public function getItem(): string
    {
        $this->pageRenderer->loadJavaScriptModule('@luisasofie/unicorn/unicorn-runner.js');
        return '<span class="toolbar-item-icon" title="Unicorn Runner" style="display: none;">'
            . '<typo3-backend-icon identifier="unicorn-icon" size="medium"></typo3-backend-icon>'
            . '</span>';
    }

    public function hasDropDown(): bool
    {
        return false;
    }

    public function getDropDown(): string
    {
        return '';
    }

    public function getAdditionalAttributes(): array
    {
        return [];
    }

    public function getIndex(): int
    {
        return 90;
    }
}
