<?php

namespace common\models;

use Yii;
use yii\helpers\Html;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;

/**
 * Class Helper
 * @package common\models
 */
class Helper {

    /**
     * @return string
     */
    public static function pageId() : string {
        $id = Yii::$app->id;
        $id .= '_' . Yii::$app->controller->id;
        $id .= '_' . Yii::$app->controller->action->id;

        return $id;
    }

    /**
     * @param string $permission
     * @param string $label
     * @param string|array $url
     * @return string
     */
    public static function canLink( string $permission, string $label, $url ) : string {
        return Yii::$app->user->can( $permission ) ?
            Html::a( $label, $url ) : $label;
    }

    /**
     * @param string $area
     * @return string
     */
    public static function createButton( string $area ) : string {
        return static::button( $area, 'create' );
    }

    /**
     * @param string $area
     * @param string $action
     * @param string|null $label
     * @return string
     */
    public static function button( string $area, string $action, array $config = [] ) {
        if( !Yii::$app->user->can( "$area.$action" ) )
            return '';

        try {
            if( !empty( $config['callback'] ) )
                if( !$result = call_user_func( $config['callback'] ) )
                    return '';
        } catch( \Exception $e ) {
            return '';
        }

        $route = ( !empty( $config['route'] ) )?
            $config['route'] : [ $action ];

        if( empty( $config['label'] ) ) {
            $action = ucfirst( $action );
            $area = ucfirst( $area );
            $config['label'] = "$action $area";
        }

        if( empty( $config['class'] ) )
            $config['class'] = 'btn btn-success';

        $options = [ 'class' => $config['class'] ];
        if( !empty( $config['data'] ) )
            $options['data'] = $config['data'];

        return Html::a( Yii::t('app/backend', $config['label'] ), $route, $options );
    }

    /**
     * @param string $area
     * @param ActiveRecord $model
     * @return string
     */
    public static function viewButtons( string $area, ActiveRecord $model ) :string {
        $buttons = '';
        if( Yii::$app->user->can( "$area.update", ['model' => $model ] ) )
            $buttons .= (string) Html::a(
                Yii::t('yii', 'Update'),
                ['update', 'id' => $model->id ],
                ['class' => 'btn btn-primary']
            );

        if( $buttons ) $buttons .= ' ';

        if( Yii::$app->user->can( "$area.delete", ['model' => $model ] ) )
            $buttons .= (string) Html::a(
                Yii::t('yii', 'Delete'),
                ['delete', 'id' => $model->id ],
                [
                    'class' => 'btn btn-danger',
                    'data' => [
                        'confirm' => Yii::t('yii',
                            'Are you sure you want to delete this item?'
                        ),
                        'method' => 'post',
                    ],
                ]
            );

        return $buttons;
    }

    /**
     * @param string $area
     * @return array
     */
    public static function visibleButtons( string $area, array $actions = [] ) :array {

        $config = [];
        $actions = array_merge(['view', 'update'], $actions );
        foreach( $actions as $action )
            $config[ $action ] = function( $model, $key, $index ) use ( $area, $action ) {
                /** @var \common\models\CrudModel $model */
                return Yii::$app->user->can(
                    "$area.$action",
                    [ 'model' => $model ]
                );
            };

        $config['delete'] = function( $model, $key, $index ) use ( $area ) {
            /** @var \common\models\CrudModel $model */
            if( $model->isCheckDefault && !empty( $model->is_default ) ) return false;
            return Yii::$app->user->can(
                "$area.delete",
                [ 'model' => $model ]
            );
        };

        return $config;
    }

    /**
     * @param null|string $key
     * @param null|mixed $default
     * @return array|null
     */
    public static function getParams( $key = null, $default = null ) {
        $params = \Yii::$app->params;
        if( is_null( $key ) )
            return $params;

        return ( isset( $params[ $key ] ) )?
            $params[ $key ] : $default;
    }

    /**
     * @param string $key
     * @param bool $checkNamespace
     * @return mixed
     */
    public static function getSettings( string $key, bool $checkNamespace = false, $asModels = false ) {
        $query = Setting::find();
        if( $checkNamespace ) {
            $settings = $query->where(['like', 'key', $key . '.' ])->all();
        } else {
            $setting = $query->where(['key' => $key ])->one();
            $settings = $setting ? [ $setting ] : [];
        }
        $array = [];
        foreach( $settings as $setting ) {
            $path = $checkNamespace ? explode( '.', $setting->key ) : [ $setting->key ];
            $array = ( count( $path ) == 1 ) ?
                [ $setting->key => ( $asModels ? $setting : $setting->decodedValue ) ] :
                static::_setValue( $path, $array, $setting, $asModels );
        }

        $setting = reset( $array );
        if( empty( $setting ) && isset( Yii::$app->params['settings'] ) ) {
            $setting = ArrayHelper::getValue( Yii::$app->params['settings'], $key );
            $setting = $asModels ? new Setting(['value' => $setting ]) : $setting;
        }

        return $setting;
    }

    /**
     * @return bool
     */
    public static function isMobile() : bool {
        return \Yii::$app->deviceDetect->isMobile();
    }

    /**
     * @param array $path
     * @param array $array
     * @param Setting $setting
     * @param bool $asModels
     * @return array
     */
    protected static function _setValue( array $path, array $array, Setting $setting, bool $asModels ) {
        $key = array_shift( $path );
        if( empty( $path ) ) {
            $value = ( $asModels ? $setting : $setting->decodedValue );
        } else
            $value = ( isset( $array[ $key ] ) ? $array[ $key ] : [] );

        $array[ $key ] = $value;

        if( empty( $path ) )
            return $array;

        $subArray = $array[ $key ];
        $array[ $key ] = static::_setValue( $path, $subArray, $setting, $asModels );

        return $array;
    }
}
