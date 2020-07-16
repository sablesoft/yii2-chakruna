<?php

namespace frontend\controllers;

use yii\web\Controller;

class XhatController extends Controller
{
    public function actionPull()
    {
        // ловим ключ запроса:
        $xhtKey = \Yii::$app->request->get('key');
        // возвращаем html:
        return $this->renderPartial("$xhtKey.html");
    }
}
