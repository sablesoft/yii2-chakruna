<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Spoke */

$this->title = Yii::t('app', 'Create Spoke');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Spokes'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="spoke-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
