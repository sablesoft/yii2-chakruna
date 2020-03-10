<?php
/**
 * Created by PhpStorm.
 * User: roan
 * Date: 29.11.19
 * Time: 19:57
 */

namespace frontend\controllers;

use yii\web\Controller;

class XhatController extends Controller
{

    public function actionIndex()
    {

    }

    /**
     *
     */
    public function actionPull()
    {
        // ловим ключ запроса:
        $xhtKey = \Yii::$app->request->get('key');
        // возвращаем html:
        return $this->renderPartial("$xhtKey.html");
    }

    public function actionPush()
    {

    }
}