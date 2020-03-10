<?php
return [
    'id' => 'chakruna-common-tests',
    'basePath' => dirname(__DIR__),
    'components' => [
        'user' => [
            'class' => 'yii\web\User',
            'identityClass' => 'common\models\User',
        ],
        'request' => [
            'cookieValidationKey' => 'test',
        ],
    ],
];
