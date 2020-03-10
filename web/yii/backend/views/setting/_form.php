<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Setting */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="setting-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'label')->textInput(['maxlength' => true]) ?>
    <?= $form->field($model, 'key')->textInput(['maxlength' => true, 'disabled' => !empty( $model->key )]) ?>
    <?= $form->field($model, 'value')->textarea(['rows' => 4]) ?>
    <?= $form->field($model, 'description')->textarea(['rows' => 4]) ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('yii', 'Save'), ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
