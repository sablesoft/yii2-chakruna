<?php

use yii\db\Migration;

/**
 * Handles the creation of table `element`.
 */
class m200305_051507_create_element_table extends Migration
{
    private $table = 'element';

    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->table;
        $this->createTable($table, [
            'id' => $this->primaryKey(),
            'lang_id'    => $this->integer()->notNull()->comment('Language ID'),
            'icon_id'    => $this->integer()->null()->unsigned()->comment('Element icon ID'),
            'name'       => $this->string(20)->notNull()->unique()->comment('Element localized name'),
            'desc'       => $this->text()->null()->comment('Element localized description'),
            // use in all tables:
            'owner_id'    => $this->integer()->comment('Owner'),
            'created_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Creation time'),
            'updated_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Last update time')
        ],'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');
        // add foreign keys for table `element`:
        $this->addForeignKey("fk-$table-lang", $table, 'lang_id', 'language', 'id');
        $this->addForeignKey("fk-$table-owner", $table, 'owner_id', 'user', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $table = $this->table;
        // drops foreign keys:
        $this->dropForeignKey( "fk-$table-lang", $table);
        $this->dropForeignKey( "fk-$table-owner", $table);
        $this->dropTable($table);
    }
}
