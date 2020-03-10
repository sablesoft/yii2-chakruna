<?php

use yii\db\Migration;

/**
 * Handles the creation of table `setting`.
 */
class m190122_000808_create_setting_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('setting', [
            'id'    => $this->primaryKey(),
            'label'  => $this->string(40)->unique()->notNull()
                ->comment('Setting label'),
            'key'   => $this->string(30)->unique()->notNull()
                ->comment('Setting programmer code unique key'),
            'value' => $this->text()->null()->comment('Setting value'),
            'description' => $this->text()->null()->comment('Setting description')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        $this->dropTable('setting');
    }
}
