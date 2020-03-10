<?php
namespace common\behavior;

use yii\base\Behavior;
use yii\db\ActiveQuery;

/**
 * Class DateFilterBehavior
 * @package common\behavior
 *
 */
class DateFilterBehavior extends Behavior {

    const DAY_IN_SECONDS = 24 * 60 * 60;

    /**
     * @param string $attribute
     * @param ActiveQuery $query
     * @return ActiveQuery
     */
    public function applyDateFilter( string $attribute, ActiveQuery $query ) : ActiveQuery {
        if( empty( $this->owner->$attribute ) )
            return $query;

        $date = strtotime( $this->owner->$attribute );
        $nextDate = $date + self::DAY_IN_SECONDS;
        $query->andFilterWhere([ '>=', $attribute, $date ])
            ->andFilterWhere([ '<', $attribute, $nextDate ]);

        return $query;
    }
}
