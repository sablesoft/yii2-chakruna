<?php
return [
    'name' => 'Chakruna',
    'language' => 'en',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => require( __DIR__ . '/components.php')
];
