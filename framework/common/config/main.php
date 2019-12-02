<?php
return [
    'name' => 'Chakruna',
    'language' => 'en',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'urlManager' => [
            'class' => 'codemix\localeurls\UrlManager',
            'languages' => ['en', 'ru'],
            'enablePrettyUrl' => true,
            'enableDefaultLanguageUrlCode' => true,
            'showScriptName' => false,
        ],
        'assetManager' => [
            'linkAssets' => true
        ],
        'i18n' => [
            'translations' => [
                'docker*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@common/messages',
                    'sourceLanguage' => 'en-US',
                ],
                'yii' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'sourceLanguage' => 'en-US',
                    'basePath' => '@common/messages'
                ]
            ]
        ],
        'vueManager'   => [
            'class'      => 'sablerom\vue\VueManager',
            'delimiters' => [ '[[', ']]' ]  // specify custom for smarty
        ],
        'view' => [
            'renderers' => [
                'tpl' => [
                    'class' => 'yii\smarty\ViewRenderer',
                    //'cachePath' => '@runtime/Smarty/cache',
                    'widgets' => [
                        'blocks' => [
                            'ActiveForm' => '\yii\widgets\ActiveForm'
                        ]
                    ]
                ]
            ]
        ]
    ]
];
