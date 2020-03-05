<?php

return [
    'cache' => [
        'class' => 'yii\caching\FileCache',
    ],
    'imagemanager' => [
        'class' => 'noam148\imagemanager\components\ImageManagerGetPath',
        //set media path (outside the web folder is possible)
        'mediaPath' => '../../media',
        //path relative web folder. In case of multiple environments (frontend, backend) add more paths
        'cachePath' =>  ['assets/media'],
        //use filename (seo friendly) for resized images else use a hash
        'useFilename' => true,
        //show full url (for example in case of a API)
        'absoluteUrl' => false,
        'databaseComponent' => 'db' // The used database component by the image manager, this defaults to the Yii::$app->db component
    ],
    'urlManager' => [
        'class' => 'codemix\localeurls\UrlManager',
        'languages' => ['en', 'ru'],
        'enablePrettyUrl' => true,
        'enableStrictParsing' => false,
        'enableDefaultLanguageUrlCode' => true,
        'showScriptName' => false,
        'ignoreLanguageUrlPatterns' => [
            '#^api/#' => '#^api/#',
            '#^user#' => '#^user#',
            '#^gii#' => '#^gii#'
        ],
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
];