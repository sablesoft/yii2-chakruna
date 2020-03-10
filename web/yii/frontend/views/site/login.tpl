{use class='yii\bootstrap\Html'}
{title}Login{/title}
<div class="site-login">
    <h1>{$this->title}</h1>
    <p>Please fill out the following fields to login:</p>
    <div class="row">
        <div class="col-lg-5">
            {ActiveForm assign='form' id='login-form' action='/login' options=['class' => 'form-horizontal']}
                {$form->field($model, 'username')->textInput(['autofocus' => true])}
                {$form->field($model, 'password')->passwordInput()}
                {$form->field($model, 'rememberMe')->checkbox()}

                <div style="color:#999;margin:1em 0">
                    If you forgot your password you can {Html::a('reset it', ['site/request-password-reset'])}
                </div>

                <div class="form-group">
                    {Html::submitButton('Login', ['class' => 'btn btn-primary', 'name' => 'login-button'])}
                </div>
            {/ActiveForm}
        </div>
    </div>
</div>
