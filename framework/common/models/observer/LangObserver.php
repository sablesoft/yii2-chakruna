<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace common\models\observer;

use yii\base\Event;
use yii\base\Application;
use common\models\Language;

/**
 * Class LangObserver
 * @package common\models\observer
 */
class LangObserver
{
    public static function beforeRequest( Event $event ) {
        /** @var Application $app */
        $app = $event->sender;
        $app->urlManager->languages = Language::getDropDownList(['to' => 'code'])[0];
    }
}