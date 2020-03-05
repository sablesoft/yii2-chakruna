<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel common\models\search\ElementSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Elements');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="element-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <?php if(Yii::$app->user->can('admin') || !!$searchModel->freeCodes): ?>
    <p>
        <?= Html::a(Yii::t('app', 'Create Element'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?php endif; ?>

    <?php Pjax::begin(); ?>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => $searchModel->columns,
    ]); ?>

    <?php Pjax::end(); ?>

</div>
