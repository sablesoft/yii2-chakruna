<?php

return [
    'request' => [
        'csrfParam' => '_csrf-frontend'
    ],
//    'user' => [
//        'identityClass' => 'common\models\User',
//        'enableAutoLogin' => true,
//        'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true]
//    ],
    'session' => [
        // this is the name of the session cookie used for login on the frontend
        'name' => 'advanced-frontend'
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
            '/about' => '/site/about',
            '/contact' => '/site/contact',
            // '/api/<controller>' => '/<controller>',
            [
                //'pattern' => '/api/users',
                'class' => 'yii\rest\UrlRule',
                'controller' => 'user'
            ]
        ]
    ],
];
