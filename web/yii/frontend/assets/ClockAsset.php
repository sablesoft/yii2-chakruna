<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class ClockAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/font-awesome.css',
        'css/clock.css',
    ];
    public $js = [
        'js/bootstrap.js',
        'js/custom.js',
        'js/handlebars.js',
        'js/xhat-client.js',
        'js/moment.js',
        'js/storage.js',
        'js/gate.js',
        'js/staff.js',
        'js/all-boxes.js',
        'js/all-labels.js',
        'js/all-quotes.js',
        'js/all-tips.js',
        'js/all-tours.js',
        'js/board.js',
        'js/clock.js',
        'js/index.js',
        'js/buttons.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'frontend\assets\TooltipsterAsset'
    ];
}
