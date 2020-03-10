<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Cycle */

$this->title = Yii::t('app', 'Create Cycle');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Cycles'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cycle-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
