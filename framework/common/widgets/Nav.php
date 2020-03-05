<?php
namespace common\widgets;

use Yii;
use yii\helpers\Html;

/**
 * Class Nav
 * @package common\widgets
 */
class Nav extends \yii\bootstrap\Nav {

    /**
     * @return array
     */
    public static function menuItems() : array {
        $menuItems = [];

        if (Yii::$app->user->isGuest) {
            $menuItems[] = ['label' => Yii::t('app', 'Signup'), 'url' => ['/site/signup']];
            $menuItems[] = ['label' => Yii::t('app', 'Login'), 'url' => ['/site/login']];
        } else {
            $menuItems[] = '<li>'
                . Html::beginForm(['/site/logout'], 'post')
                . Html::submitButton(
                    Yii::t('app', 'Logout') . ' (' . Yii::$app->user->identity->username . ')',
                    ['class' => 'btn btn-link logout']
                )
                . Html::endForm()
                . '</li>';
        }

        return $menuItems;
    }
}
