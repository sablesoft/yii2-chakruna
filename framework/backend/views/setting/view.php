<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use common\models\Helper;
/* @var $this yii\web\View */
/* @var $model common\models\Setting */

$area = 'setting';
$this->title = $model->label;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app/backend', 'Settings'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="setting-view">
    <h1><?= Html::encode($this->title) ?></h1>
    <p><?= Helper::viewButtons( $area, $model ); ?></p>
    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'value',
            'description:ntext',
            'key'
        ]
    ]); ?>

</div>
