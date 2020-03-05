<?php

return [
    'request' => [
        'csrfParam' => '_csrf-backend',
        'parsers' => [
            'application/json' => 'yii\web\JsonParser'
        ]
    ],
    'user' => [
        'identityClass' => 'common\models\User',
        'enableAutoLogin' => true,
        'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true]
    ],
    'session' => [
        // this is the name of the session cookie used for login on the backend
        'name' => 'advanced-backend'
    ],
    'log' => [
        'traceLevel' => YII_DEBUG ? 3 : 0,
        'targets' => [
            [
                'class' => 'yii\log\FileTarget',
                'levels' => ['error', 'warning']
            ]
        ]
    ],
    'errorHandler' => [
        'errorAction' => 'site/error'
    ],
    'urlManager' => [
        'rules' => [
            '/' => '/site/index',
            '/login' => '/site/login',
            '/imagemanager' => '/media',
            '/imagemanager/<controller>' => '/media/<controller>',
            '/imagemanager/<controller>/<action>' => '/media/<controller>/<action>'
        ]
    ]
];
