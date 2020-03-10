<?php

use yii\db\Migration;
use common\models\User;

/**
 * Handles the creation of table `{{%language}}`.
 */
class m200217_172239_create_language_table extends Migration
{
    private $table = 'language';
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->table;
        $this->createTable("{{%$table}}", [
            'id'            => $this->primaryKey(),
            'code'          => $this->string(5)->notNull()->unique()->comment('Language code'),
            'name'          => $this->string(20)->notNull()->unique()->comment('Language default name'),
            'native_name'   => $this->string(20)->notNull()->unique()->comment('Language native name'),
            // use in all tables:
            'owner_id'    => $this->integer()->notNull()->comment('Owner'),
            'created_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Creation time'),
            'updated_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Last update time')
        ], 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');
        // add foreign keys for table `language`:
        $this->addForeignKey("fk-$table-owner", $table, 'owner_id', 'user', 'id');

        if (($systemUser = Yii::$app->params['systemUser']) &&
            ($systemLanguages = Yii::$app->params['systemLanguages'])) {
            echo "System user checking... ";
            if (!empty($systemUser['username']) && $user = User::findOne(['username' => $systemUser['username']])) {
                echo "...done!\r\n";
                foreach($systemLanguages as $data) {
                    $data['owner_id'] = $user->id;
                    try {
                        if (Yii::$app->db->createCommand()->insert('language', $data)->execute()) {
                            $code = $data['code'];
                            echo "System language '$code' installed!\r\n";
                        } else {
                            echo "We have some error! Language '$code' not installed!\r\n";
                        }
                    } catch ( \Exception $e ) {
                        echo "Insert error: " .  $e->getMessage() . "\r\n";
                    }
                }
            } else {
                echo "WARNING! System user not found! System languages installation skipped!\r\n";
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $table = $this->table;
        // drops foreign keys:
        $this->dropForeignKey( "fk-$table-owner", $table);
        $this->dropTable("{{%$table}}");
    }
}
