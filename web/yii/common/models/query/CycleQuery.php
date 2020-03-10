<?php

namespace common\models\query;

use common\models\Cycle;

/**
 * This is the ActiveQuery class for [[\common\models\Cycle]].
 *
 * @see Cycle
 */
class CycleQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return Cycle[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return Cycle|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
