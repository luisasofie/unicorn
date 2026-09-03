<?php

declare(strict_types=1);

$EM_CONF[$_EXTKEY] = [
    'title' => 'Unicorn',
    'description' => 'A magical unicorn that runs and jumps across the TYPO3 backend.',
    'category' => 'be',
    'state' => 'stable',
    'version' => '1.0.2',
    'author' => 'Luisa Sofie Faßbender',
    'author_email' => '',
    'constraints' => [
        'depends' => [
            'typo3' => '14.0.0-14.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
