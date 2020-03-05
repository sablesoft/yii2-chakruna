<?php

use yii\db\Migration;

/**
 * Handles the creation of table `spoke`.
 */
class m200305_051523_create_spoke_table extends Migration
{
    private $table = 'spoke';
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->table;
        $this->createTable($table, [
            'id' => $this->primaryKey(),
            'lang_id'    => $this->integer()->comment('Language ID'),
            'element_id' => $this->integer()->comment('Element ID'),
            'icon_id'    => $this->integer()->null()->unsigned()->comment('Spoke icon ID'),
            'name'       => $this->string(20)->notNull()->unique()->comment('Spoke localized name'),
            'direction'  => $this->string(5)->notNull()->comment('Spoke direction'),
            'desc'       => $this->text()->null()->comment('Spoke localized description'),
            // use in all tables:
            'owner_id'    => $this->integer()->notNull()->comment('Owner'),
            'created_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Creation time'),
            'updated_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Last update time')
        ],'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');
        // create unique type translate:
        $this->createIndex(
            "idx-unique-$table-direction", $table,
            ['direction', 'lang_id'], true
        );
        // add foreign keys for table `cycle`:
        $this->addForeignKey("fk-$table-lang", $table, 'lang_id', 'language', 'id');
        $this->addForeignKey("fk-$table-element", $table, 'element_id', 'element', 'id');
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
        $this->dropForeignKey( "fk-$table-element", $table);
        $this->dropForeignKey( "fk-$table-owner", $table);
        $this->dropTable($table);
    }
}
