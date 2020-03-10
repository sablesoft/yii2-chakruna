<?php
namespace common\widgets;

use yii\web\View;

/**
 * Class Breadcrumbs
 * @package common\widgets
 */
class Breadcrumbs extends \yii\widgets\Breadcrumbs {

    /**
     * @param View $view
     * @return array
     */
    public static function links( View $view ) : array {
        return isset($view->params['breadcrumbs']) ? $view->params['breadcrumbs'] : [];
    }
}
