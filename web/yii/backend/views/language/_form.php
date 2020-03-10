<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Language */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="language-form">

    <?php $form = ActiveForm::begin(); ?>

    <div class="col-sm-2">
        <?php // code field: ?>
        <?php if(Yii::$app->controller->action->id == 'create'): ?>
            <?= $form->field($model, 'code')->textInput(['maxlength' => true]) ?>
        <?php else: ?>
            <?= $form->field($model, 'code')->textInput(['maxlength' => true, 'disabled' => 'disabled']) ?>
        <?php endif; ?>
    </div>

    <div class="col-sm-4">
        <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
    </div>

    <div class="col-sm-4">
        <?= $form->field($model, 'native_name')->textInput(['maxlength' => true]) ?>
    </div>


    <div class="col-sm-2">
        <br>
        <div class="form-group">
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-success']) ?>
        </div>
    </div>

    <?php ActiveForm::end(); ?>

</div>
