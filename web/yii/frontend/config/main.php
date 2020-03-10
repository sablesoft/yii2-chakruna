<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'frontend\controllers',
    'components' => require( __DIR__ . '/components.php'),
    'params' => $params,
    'modules' => [
        'user' => [
            // following line will restrict access to admin controller from frontend application
            'as frontend' => [
                'class' => 'dektrium\user\filters\FrontendFilter',
                'controllers' => ['admin']
            ]
        ]
    ]
];
