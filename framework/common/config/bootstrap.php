<?php

use yii\base\Event;
use yii\base\Application;

Yii::setAlias('@common', dirname(__DIR__));
Yii::setAlias('@frontend', dirname(dirname(__DIR__)) . '/frontend');
Yii::setAlias('@backend', dirname(dirname(__DIR__)) . '/backend');
Yii::setAlias('@console', dirname(dirname(__DIR__)) . '/console');

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
