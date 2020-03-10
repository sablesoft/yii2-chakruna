{use class='frontend\assets\AppAsset'}
{use class='yii\helpers\Html'}
{use class='common\widgets\Alert'}

{AppAsset::register($this)|void}
{$this->beginPage()}
<!DOCTYPE html>
<html lang="{Yii::$app->language}">
<head>
    <meta charset="{Yii::$app->charset}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {Html::csrfMetaTags()}
    <title>{$this->title}</title>
    {$this->head()}
</head>
<body data-lang="{Yii::$app->language}">
{$this->beginBody()}

<div class="wrap">
    {include '@common/views/layouts/navbar.tpl'}
    <div id="main-container" class="container">
        {include '@common/views/layouts/breadcrumbs.tpl'}
        {Alert::widget()}
        {$content}
    </div>
</div>

{include '@common/views/layouts/footer.tpl'}

{$this->endBody()}
</body>
</html>
{$this->endPage()}
