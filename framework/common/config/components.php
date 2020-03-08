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
    // TODO - move to local!
    'authClientCollection' => [
        'class' => yii\authclient\Collection::class,
        'clients' => [
//            'facebook' => [
//                'class'        => 'dektrium\user\clients\Facebook',
//                'clientId'     => 'CLIENT_ID',
//                'clientSecret' => 'CLIENT_SECRET',
//            ],
//            'twitter' => [
//                'class'          => 'dektrium\user\clients\Twitter',
//                'consumerKey'    => 'CONSUMER_KEY',
//                'consumerSecret' => 'CONSUMER_SECRET',
//            ],
            'google' => [
                'class'        => 'dektrium\user\clients\Google',
                'clientId'     => '246445368708-2j94ndfe9icfv2dugdp83hh3d6j4783v.apps.googleusercontent.com',
                'clientSecret' => 'q1XVEcbSb3Rt6KXeLp5NvYzO',
            ]
        ]
    ],
    'urlManager' => [
        'class' => 'codemix\localeurls\UrlManager',
        'languages' => ['en'],
        'enablePrettyUrl' => true,
        'enableStrictParsing' => false,
        'enableDefaultLanguageUrlCode' => true,
        'showScriptName' => false,
        'ignoreLanguageUrlPatterns' => [
            '#^api/#' => '#^api/#',
            '#^gii#' => '#^gii#'
        ],
        'rules' => [
            '/' => '/site/index',
            '/login' => '/user/security/login',
            '/logout' => '/user/security/logout',
            '/signup' => '/user/registration/register',
        ]
    ],
    'assetManager' => [
        'linkAssets' => true
    ],
    'i18n' => [
        'translations' => [
            'app*' => [
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
