<?php
namespace common\interfaces;

use yii\data\ActiveDataProvider;

/**
 * Interface SearchInterface
 * @package common\interfaces
 */
interface SearchInterface {

    /**
     * @param array $params
     * @return ActiveDataProvider
     */
    public function search( array $params ) : ActiveDataProvider;

}
