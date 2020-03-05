<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
use common\models\Element;

/* @var $this yii\web\View */
/* @var $searchModel common\models\search\ElementSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Elements');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="element-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Create Element'), ['create'], ['class' => 'btn btn-success']) ?>
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
            [
                'attribute' => 'icon_id',
                'value' => function( $model ) {
                    /** @var Element $model */
                    return $model->imagePath;
                },
                'format' => 'image',
                'enableSorting' => false,
                'filter' => false
            ],
            'name',
            'desc:ntext',
            //'owner_id',
            //'created_at',
            //'updated_at',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

    <?php Pjax::end(); ?>

</div>
