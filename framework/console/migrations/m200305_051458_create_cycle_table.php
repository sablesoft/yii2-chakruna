<?php

use yii\db\Migration;

/**
 * Handles the creation of table `cycle`.
 */
class m200305_051458_create_cycle_table extends Migration
{
    private $table = 'cycle';
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->table;
        $this->createTable($table, [
            'id' => $this->primaryKey(),
            'code' => $this->string('10')->notNull()->comment('Cycle code'),
            'lang_id'    => $this->integer()->notNull()->comment('Language ID'),
            'icon_id'       => $this->integer()->null()->unsigned()->comment('Cycle icon ID'),
            'name'       => $this->string(20)->notNull()->unique()->comment('Cycle localized name'),
            'desc'       => $this->text()->null()->comment('Cycle localized description'),
            // use in all tables:
            'owner_id'    => $this->integer()->notNull()->comment('Owner'),
            'created_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Creation time'),
            'updated_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Last update time')
        ],'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');
        // create unique translate index:
        $this->createIndex(
            "idx-unique-$table-code", $table,
            ['lang_id', 'code'], true
        );
        // add foreign keys for table `cycle`:
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
