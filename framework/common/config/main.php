<?php
return [
    'name' => 'Chakruna',
    'language' => 'en',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => require( __DIR__ . '/components.php'),
    'modules' => [
        'user' => [
            'class' => 'dektrium\user\Module',
            'admins' => ['admin'],
            'enableUnconfirmedLogin' => true,
            'enableConfirmation' => false,
            'enableAccountDelete' => true,
            'rememberFor' => 1209600,
            // you will configure your module inside this file
            // or if need different configuration for frontend and backend you may
            // configure in needed configs
        ],
        'rbac' => 'dektrium\rbac\RbacWebModule',
    ]
];
