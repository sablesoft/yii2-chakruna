<?php
namespace common\rbac;

use Yii;
use yii\web\Controller;
use yii\base\ActionEvent;
use common\models\Helper;
use yii\helpers\ArrayHelper;
use backend\models\CrudController;

/**
 * Class ActionAccess
 * @package common\observer
 */
class AccessObserver {

    /**
     * @param ActionEvent $event
     */
    public static function beforeAction( ActionEvent $event ) {
        /** @var Controller $sender */
        $sender = $event->sender;
        // check is skip:
        if( static::isSkip( $sender ) ) return;

        // prepare pattern:
        $moduleId = $sender->module->id;
        $pattern = "{module}.{controller}.{action}";
        $pattern = static::setting("pattern.$moduleId", $pattern );
        // prepare permission:
        $permission = Yii::t('app', $pattern, [
            'module'        => $moduleId,
            'controller'    => $sender->id,
            'action'        => $sender->action->id
        ]);
        // check permission:
        If( !Yii::$app->user->can( $permission, self::prepareParams( $sender ) ) ) {
            $message = Yii::t('yii', 'Access denied');
            Yii::$app->session->setFlash('error', $message );
            Yii::info("Access to $permission denied", 'access' );
            $event->handled = true;
            $event->isValid = false;
            $sender->redirect(Yii::$app->request->referrer ?: Yii::$app->homeUrl );
        }
    }

    /**
     * @param Controller $sender
     * @return bool
     */
    protected static function isSkip( Controller $sender ) : bool {
        if( in_array( $sender->id, static::setting('skipController') ) ) return true;
        if( in_array( $sender->module->id, static::setting('skipModule') ) ) return true;

        return false;
    }

    /**
     * @param string $key
     * @param array $default
     * @return mixed
     */
    protected static function setting( string $key, $default = [] ) {
        $settings = Helper::getSettings('access') ?: [];

        return ArrayHelper::getValue( $settings, $key, $default );
    }

    /**
     * @param Controller|CrudController $controller
     * @return array
     */
    protected static function prepareParams( $controller ) {
        try {
            $model = null;
            $model = $controller->getModel();
        } catch( \Exception $e ) {}

        return [ 'model' => $model ];
    }
}
