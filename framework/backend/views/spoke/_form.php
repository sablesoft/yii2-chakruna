<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use common\models\Element;
use common\models\Language;
use noam148\imagemanager\components\ImageManagerInputWidget;

/* @var $this yii\web\View */
/* @var $model common\models\Spoke */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="spoke-form">

    <?php $form = ActiveForm::begin(); ?>

    <?php // code field: ?>
    <?php if(Yii::$app->controller->action->id == 'create'): ?>
        <?= $form->field($model, 'code')->dropDownList($model->freeCodes); ?>
    <?php else: ?>
        <?= $form->field($model, 'code')->textInput(['maxlength' => true, 'disabled' => 'disabled']) ?>
    <?php endif; ?>

    <? // language field: ?>
    <?php if( \Yii::$app->user->can('admin')): ?>
        <?= $form->field($model, 'lang_id')->dropDownList(
            ...Language::getDropDownList([
            'prompt' => Yii::t('app', 'Select language')
        ])); ?>
    <?php else: ?>
        <?= $form->field($model, 'lang_id')
            ->hiddenInput(['value' => Language::current()->id ])->label(false); ?>
    <?php endif; ?>

    <?= $form->field($model, 'element_id')->dropDownList(
        ...Element::getDropDownList([
        'prompt' => Yii::t('app', 'Select element')
    ])); ?>

    <?= $form->field( $model, 'icon_id')->widget( ImageManagerInputWidget::class, [
        'aspectRatio' => ( 16 / 9 ), //set the aspect ratio
        'cropViewMode' => 1, //crop mode, option info: https://github.com/fengyuanchen/cropper/#viewmode
        'showPreview' => true, //false to hide the preview
        'showDeletePickedImageConfirm' => false, //on true show warning before detach image
    ]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'direction')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'desc')->textarea(['rows' => 6]) ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
