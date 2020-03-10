<?php

use yii\db\Migration;

/**
 * Class m200305_074705_install_imagemanager
 */
class m200305_074705_install_imagemanager extends Migration
{
    const MEDIA_TABLE = 'ImageManager';
    const ICON_FIELD = 'icon_id';
    private $tables = ['cycle', 'element', 'spoke', 'lair'];
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        echo "Install ImageManager migrations...\r\n";
        shell_exec("/var/www/html/yii migrate --migrationPath=@noam148/imagemanager/migrations --interactive=0");
        $field = self::ICON_FIELD;
        echo "Create foreign keys to ImageManager table...\r\n";
        foreach($this->tables as $table) {
            $this->addForeignKey("fk-$table-$field",
                $table, $field, self::MEDIA_TABLE, 'id'
            );
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $field = self::ICON_FIELD;
        echo "Drop foreign keys to ImageManager table...\r\n";
        foreach($this->tables as $table) {
            $this->dropForeignKey("fk-$table-$field", $table );
        }
         echo "WARNING! You must manually use in cli: \r\n";
         echo "./yii migrate/down 2 --migrationPath=@noam148/imagemanager/migrations --interactive=0\r\n";
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200305_074705_install_imagemanager cannot be reverted.\n";

        return false;
    }
    */
}
