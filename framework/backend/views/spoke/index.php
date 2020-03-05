<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use common\models\Spoke;

/* @var $this yii\web\View */
/* @var $searchModel common\models\search\SpokeSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Spokes');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="spoke-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Create Spoke'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php Pjax::begin(); ?>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'lang_id',
            'element_id',
            [
                'attribute' => 'icon_id',
                'value' => function( $model ) {
                    /** @var Spoke $model */
                    return $model->imagePath;
                },
                'format' => 'image',
                'enableSorting' => false,
                'filter' => false
            ],
            'name',
            //'direction',
            //'desc:ntext',
            //'owner_id',
            //'created_at',
            //'updated_at',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
