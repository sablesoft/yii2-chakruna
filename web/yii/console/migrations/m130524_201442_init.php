<?php

use yii\db\Migration;
use dektrium\user\models\RegistrationForm;

/**
 * Class m130524_201442_init
 */
class m130524_201442_init extends Migration
{
    public function up()
    {
        echo "Install Dektrium user migrations...\r\n";
        shell_exec("/var/www/html/yii migrate/up --migrationPath=@vendor/dektrium/yii2-user/migrations --interactive=0");
        echo "Install Yii2 RBAC migrations...\r\n";
        shell_exec("/var/www/html/yii migrate/up --migrationPath=@yii/rbac/migrations --interactive=0");

        // check system user data in app parameters:
        if ($userData = Yii::$app->params['systemUser']) {
            echo "Create system user from app params...\r\n";
            try {
                $form = new RegistrationForm();
                $form->load($userData, '');
                if($form->register()) {
                    echo "System user '$form->username' created!";
                } else {
                    foreach( $form->getErrorSummary(true) as $error) {
                        echo $error . "\r\n";
                    }
                }
            } catch (Exception $e ) {
                Yii::error($e->getMessage(), 'migration');
                echo $e->getMessage() ."\r\n";
            }
        }

    }

    public function down()
    {
        echo "WARNING! You must manually use in cli: \r\n";
        echo "/var/www/html/yii migrate/down ?? --migrationPath=@vendor/dektrium/yii2-user/migrations --interactive=0\r\n";
        echo "/var/www/html/yii migrate/down ?? --migrationPath=@yii/rbac/migrations --interactive=0\r\n";
    }
}
