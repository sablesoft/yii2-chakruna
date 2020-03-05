<?php

use yii\db\Migration;

/**
 * Handles the creation of table `lair`.
 */
class m200305_055353_create_lair_table extends Migration
{
    private $table = 'lair';
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table = $this->table;
        $this->createTable($table, [
            'id'    => $this->primaryKey(),
            'lang_id'    => $this->integer()->notNull()->comment('Language ID'),
            'cycle_id'   => $this->integer()->notNull()->comment('Cycle ID'),
            'spoke_id'   => $this->integer()->notNull()->comment('Spoke ID'),
            'icon_id'    => $this->integer()->null()->unsigned()->comment('Lair icon ID'),
            'name'       => $this->string(20)->notNull()->unique()->comment('Lair localized name'),
            'period'     => $this->string()->notNull()->comment('Lair localized period'),
            'desc'       => $this->text()->null()->comment('Lair localized description'),
            // use in all tables:
            'owner_id'    => $this->integer()->notNull()->comment('Owner'),
            'created_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Creation time'),
            'updated_at'    => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP')
                ->comment('Last update time')
        ], 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB');
        // create unique type translate:
        $this->createIndex(
            "idx-unique-$table", $table,
            ['cycle_id', 'spoke_id', 'lang_id'], true
        );
        // add foreign keys for table `lair`:
        $this->addForeignKey("fk-$table-lang", $table, 'lang_id', 'language', 'id');
        $this->addForeignKey("fk-$table-cycle", $table, 'cycle_id', 'cycle', 'id');
        $this->addForeignKey("fk-$table-spoke", $table, 'spoke_id', 'spoke', 'id');
        $this->addForeignKey("fk-$table-owner", $table, 'owner_id', 'user', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $table = $this->table;
        // drops foreign keys:
        $this->dropForeignKey( "fk-$table-spoke", $table);
        $this->dropForeignKey( "fk-$table-cycle", $table);
        $this->dropForeignKey( "fk-$table-lang", $table);
        $this->dropForeignKey( "fk-$table-owner", $table);
        $this->dropTable($table);
    }
}
