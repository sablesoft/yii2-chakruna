{use class='common\widgets\Nav'}
{use class='yii\bootstrap\NavBar'}
{use class='common\widgets\LanguageNav'}
{NavBar::begin([
    'brandLabel' => Yii::$app->name,
    'brandUrl' => Yii::$app->homeUrl,
    'options' => [
        'class' => 'navbar-inverse navbar-fixed-top'
    ]
])|void}
{LanguageNav::widget([
    'options' => ['class' => 'navbar-nav navbar-right']
])}
{Nav::widget([
    'options' => ['class' => 'navbar-nav navbar-right'],
    'items' => Nav::menuItems()
])}
{NavBar::end()|void}