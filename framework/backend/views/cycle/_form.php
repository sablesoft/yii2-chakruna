<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use common\models\Language;
use noam148\imagemanager\components\ImageManagerInputWidget;

/* @var $this yii\web\View */
/* @var $model common\models\Cycle */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="cycle-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'lang_id')->dropDownList(
        ...Language::getDropDownList([
        'prompt' => Yii::t('app', 'Select language')
    ])); ?>

    <?= $form->field( $model, 'icon_id')->widget( ImageManagerInputWidget::class, [
        'aspectRatio' => ( 16 / 9 ), //set the aspect ratio
        'cropViewMode' => 1, //crop mode, option info: https://github.com/fengyuanchen/cropper/#viewmode
        'showPreview' => true, //false to hide the preview
        'showDeletePickedImageConfirm' => false, //on true show warning before detach image
    ]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'desc')->textarea(['rows' => 6]) ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
