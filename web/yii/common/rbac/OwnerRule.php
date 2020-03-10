<?php
namespace common\rbac;

use yii\rbac\Item;
use yii\rbac\Rule;
use common\models\CrudModel;
use yii\helpers\ArrayHelper;

/**
 * Class OwnerRule
 * @package common\rbac
 */
class OwnerRule extends Rule {

    public $name = 'isOwner';

    /**
     * @param string|int $user the user ID.
     * @param Item $item the ro le or permission that this rule is associated width.
     * @param array $params parameters passed to ManagerInterface::checkAccess().
     * @return bool a value indicating whether the rule permits the role or permission it is associated with.
     */
    public function execute( $userId, $item, $params ) {

        /** @var CrudModel $model */
        if( !$model = ArrayHelper::remove($params, 'model' ) )
            return false;

        return $model->isOwner( $userId );
    }


}