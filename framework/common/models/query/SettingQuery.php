<?php

namespace common\models\query;

/**
 * This is the ActiveQuery class for [[\common\models\Setting]].
 *
 * @see \common\models\Setting
 */
class SettingQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \common\models\Setting[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @param string $key
     * @return SettingQuery
     */
    public function byKey( string $key ) {
        return $this->andWhere([ 'like', 'key', $key ]);
    }

    /**
     * @param string $key
     * @return array|\common\models\Setting|null
     */
    public function oneByKey( string $key ) {
        return $this->andWhere([ 'key' => $key ])->one();
    }

    /**
     * {@inheritdoc}
     * @return \common\models\Setting|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
