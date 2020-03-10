<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Setting */

$this->title = Yii::t('app/backend', 'Update Setting: {name}', [
    'name' => $model->label,
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('app/backend', 'Settings'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->label, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('yii', 'Update');
?>
<div class="setting-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model
    ]); ?>

</div>
