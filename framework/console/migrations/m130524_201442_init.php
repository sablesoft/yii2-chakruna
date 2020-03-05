<?php

use yii\db\Migration;
use common\models\User;
use frontend\models\SignupForm;

/**
 * Class m130524_201442_init
 */
class m130524_201442_init extends Migration
{
    public function up()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'auth_key' => $this->string(32)->notNull(),
            'password_hash' => $this->string()->notNull(),
            'password_reset_token' => $this->string()->unique(),
            'email' => $this->string()->notNull()->unique(),
            'dob' => $this->timestamp()->null()->comment("Day and time of Birth"),

            'status' => $this->smallInteger()->notNull()->defaultValue(User::STATUS_ACTIVE),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ], $tableOptions);

        // check system user data in app parameters:
        if ($userData = Yii::$app->params['systemUser']) {
            echo "Create system user from app params...\r\n";
            try {
                $form = new SignupForm();
                $form->load($userData, '');
                if($user = $form->signup()) {
                    echo "System user '$user->username' created!";
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
        $this->dropTable('{{%user}}');
    }
}
