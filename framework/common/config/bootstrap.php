<?php

use yii\base\Event;
use yii\web\Controller;
use yii\base\Application;

Yii::setAlias('@common', dirname(__DIR__));
Yii::setAlias('@frontend', dirname(dirname(__DIR__)) . '/frontend');
Yii::setAlias('@backend', dirname(dirname(__DIR__)) . '/backend');
Yii::setAlias('@console', dirname(dirname(__DIR__)) . '/console');

// prepare scheme and host:
$scheme = 'http';
$scheme = $_SERVER['REQUEST_SCHEME'] ?: $scheme;
$host = !empty( $_SERVER['HTTP_HOST'] )?
    $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
$domain = implode('.', array_slice( explode('.', $host ), -2 ) );

// languages injecting handler:
Event::on( Application::class,
    Application::EVENT_BEFORE_REQUEST,
    ['common\models\observer\LangObserver', 'beforeRequest']
);

// access handler:
//Event::on( Controller::class,
//    Controller::EVENT_BEFORE_ACTION,
//    ['common\rbac\AccessObserver', 'beforeAction']
//);
