<?php
/**
 * Created by PhpStorm.
 * User: roan
 * Date: 29.11.19
 * Time: 21:34
 */

namespace frontend\assets;

use yii\web\AssetBundle;

class TooltipsterAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web/tooltipster';
    public $css = [
        'css/tooltipster.bundle.min.css',
    ];
    public $js = [
        'js/tooltipster.bundle.min.js'
    ];
    public $depends = [
        'yii\web\JqueryAsset'
    ];
}