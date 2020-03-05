<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use common\models\Spoke;
use common\models\Cycle;
use common\models\Language;
use noam148\imagemanager\components\ImageManagerInputWidget;

/* @var $this yii\web\View */
/* @var $model common\models\Lair */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="lair-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'code')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'lang_id')->dropDownList(
        ...Language::getDropDownList([
        'prompt' => Yii::t('app', 'Select language')
    ])); ?>

    <?= $form->field($model, 'cycle_id')->dropDownList(
        ...Cycle::getDropDownList([
        'prompt' => Yii::t('app', 'Select cycle')
    ])); ?>

    <?= $form->field($model, 'spoke_id')->dropDownList(
        ...Spoke::getDropDownList([
        'prompt' => Yii::t('app', 'Select spoke')
    ])); ?>

    <?= $form->field( $model, 'icon_id')->widget( ImageManagerInputWidget::class, [
        'aspectRatio' => ( 16 / 9 ), //set the aspect ratio
        'cropViewMode' => 1, //crop mode, option info: https://github.com/fengyuanchen/cropper/#viewmode
        'showPreview' => true, //false to hide the preview
        'showDeletePickedImageConfirm' => false, //on true show warning before detach image
    ]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'period')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'desc')->textarea(['rows' => 6]) ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
