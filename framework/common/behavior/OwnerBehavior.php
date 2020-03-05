<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace common\behavior;

use common\models\User;
use yii\behaviors\AttributeBehavior;

/**
 * Class OwnerBehavior
 * @package common\behavior
 *
 * @property User|null $ownerUser
 * @property string $ownerName
 */
class OwnerBehavior extends AttributeBehavior {

    /**
     * @param int $userId
     * @return bool
     */
    public function isOwner( int $userId ) : bool {
        if( empty( $this->owner->owner_id ) )
            return false;

        return $this->owner->owner_id == $userId;
    }

    /**
     * @return User|null
     */
    public function getOwnerUser() {
        if( empty( $this->owner->owner_id ) )
            return null;

        return User::findOne( $this->owner->owner_id );
    }

    public function getOwnerName() : string {
        /** @var User $owner */
        return ($owner = $this->getOwnerUser()) ? $owner->username : '';
    }

}