<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use common\models\Language;
use noam148\imagemanager\components\ImageManagerInputWidget;

/* @var $this yii\web\View */
/* @var $model common\models\Element */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="element-form">

    <?php $form = ActiveForm::begin(); ?>

    <div class="col-sm-6">
        <?php // code field: ?>
        <?php if(Yii::$app->controller->action->id == 'create'): ?>
            <?= $form->field($model, 'code')->dropDownList($model->freeCodes); ?>
        <?php else: ?>
            <?= $form->field($model, 'code')->textInput(['maxlength' => true, 'disabled' => 'disabled']) ?>
        <?php endif; ?>
        <?= $form->field( $model, 'icon_id')->widget( ImageManagerInputWidget::class, [
            'aspectRatio' => ( 16 / 9 ), //set the aspect ratio
            'cropViewMode' => 1, //crop mode, option info: https://github.com/fengyuanchen/cropper/#viewmode
            'showPreview' => true, //false to hide the preview
            'showDeletePickedImageConfirm' => false, //on true show warning before detach image
        ]); ?>
    </div>

    <div class="col-sm-6">
        <?php if( \Yii::$app->user->can('admin')): ?>
            <?= $form->field($model, 'lang_id')->dropDownList(
                ...Language::getDropDownList([
                'prompt' => Yii::t('app', 'Select language')
            ])); ?>
        <?php else: ?>
            <?= $form->field($model, 'lang_id', ['options' => ['class' => 'form-group hidden']])
                ->hiddenInput(['value' => Language::current()->id ])->label(false); ?>
        <?php endif; ?>
        <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
        <?= $form->field($model, 'desc')->textarea(['rows' => 6]) ?>
        <div class="form-group">
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-success']) ?>
        </div>
    </div>

    <?php ActiveForm::end(); ?>

</div>
