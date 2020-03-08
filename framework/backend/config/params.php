<?php
return [
    'adminEmail' => 'admin@chakruna.club',
    'nav'   => [
        'content' => [
            '_menu' => [
                'label'     => 'Content',
                'linkOptions' => []
            ],
            '_access' => 'manager',
//            'index'  => [
//                '_menu' => [
//                    'label'     => 'Dashboard',
//                    'url'       => '/manager',
//                ]
//            ],
//            '_divider'  => true,
            'language' => [
                '_menu' => [
                    'label' => 'Languages',
                    'url'   => '/language/index'
                ],
                '_access' => 'language.index'
            ],
            'cycle'  => [
                '_menu' => [
                    'label'     => 'Cycles',
                    'url'       => '/cycle'
                ],
                '_access' => 'cycle.index'
            ],
            'element'  => [
                '_menu' => [
                    'label'     => 'Elements',
                    'url'       => '/element'
                ],
                '_access' => 'element.index'
            ],
            'spoke'  => [
                '_menu' => [
                    'label'     => 'Spokes',
                    'url'       => '/spoke'
                ],
                '_access' => 'spoke.index'
            ],
            'lair'  => [
                '_menu' => [
                    'label'     => 'Lairs',
                    'url'       => '/lair'
                ],
                '_access' => 'lair.index'
            ]
        ],
        'admin' => [
            '_menu' => [
                'label' => 'Admin'
            ],
            '_access' => 'admin',
            'media' => [
                '_menu' => [
                    'label' => 'Media',
                    'url'   => '/media'
                ]
            ],
            'control' => [
                '_menu' => [
                    'label' => 'Control',
                    'url'   => '/user/admin'
                ]
            ]
        ]
    ]
];
