<?php
namespace common\models;

use Yii;
use yii\db\ActiveQuery;
use yii\db\Exception;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use yii\behaviors\AttributeBehavior;
use common\behavior\LangBehavior;
use common\behavior\ImageBehavior;
use common\behavior\OwnerBehavior;
use common\models\query\LanguageQuery;
use common\behavior\DateFilterBehavior;

/**
 * Class CrudModel
 *
 * @package common\models
 *
 * @property int $id
 * @property string $code
 * @property string $lang_id
 * @property int $owner_id
 * @property int|null $icon_id Cycle icon ID
 * @property int|string $created_at
 * @property int|string $updated_at
 * @property string $name Localized name
 * @property string|null $desc Localized description
 *
 * @property User|null $ownerUser
 * @property string $ownerName
 * @property string|null $imagePath
 * @property Language|null $lang
 * @property string $langLabel
 * @property array $columns
 * @property array $codes
 * @property array $codesFilter
 *
 * @method ActiveQuery|LanguageQuery getLang();
 * @method string getLangLabel();
 * @method bool isOwner( int $userId );
 * @method string|null getImagePath( $options = [] );
 * @method ActiveQuery applyDateFilter( string $attribute, ActiveQuery $query );
 */
abstract class CrudModel extends ActiveRecord {

    /** @var integer */
    protected $checkDefault;

    /**
     * @return bool
     */
    public function getIsCheckDefault() : bool {
        return (bool) $this->checkDefault;
    }

    /**
     * Columns for view and index crud pages
     *
     * @return array
     */
    public function getColumns() : array
    {
        return [];
    }

    /**
     * @return string[]
     */
    public function getCodes() : array
    {
        return [];
    }

    /**
     * @return array
     */
    public function getCodesFilter() : array
    {
        $filter = [];
        foreach( $this->getCodes() as $code ) {
            $filter[$code] = $code;
        }

        return $filter;
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'lang_id' => Yii::t('app', 'Language'),
            'langLabel' => Yii::t('app', 'Language'),
            'icon_id' => Yii::t('app', 'Icon'),
            'imagePath' => Yii::t('app', 'Icon'),
            'name' => Yii::t('app', 'Name'),
            'direction' => Yii::t('app', 'Direction'),
            'desc' => Yii::t('app', 'Desc'),
            'owner_id' => Yii::t('app', 'Owner'),
            'ownerName' => Yii::t('app', 'Owner'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    /**
     * @return array
     */
    public function behaviors() {
        return [
            'owner' => [
                'class'     => OwnerBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['owner_id']
                ],
                'value' => function( $event ) {
                    return \Yii::$app->user->getIsGuest() ? null :
                            \Yii::$app->user->getId();
                }
            ],
            'icon' => [
                'class' => ImageBehavior::class,
                'imageField' => 'icon_id',
                'imageWidth' => 30,
                'imageHeight' => 30
            ],
            'lang' => [
                'class' => LangBehavior::class,
                'langField' => 'lang_id'
            ],
            'dateFilter' => [
                'class' => DateFilterBehavior::class
            ],
            'created.save' => [
                'class'      => AttributeBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['created_at']
                ],
                'value' => function( $event ) {
                    return $this->created_at ?
                        $this->created_at : date('Y-m-d H:i');
                }
            ],
            'updated.save' => [
                'class'      => AttributeBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at']
                ],
                'value' => function( $event ) {
                    return date('Y-m-d H:i');
                }
            ],
//            'created.find' => [
//                'class'      => AttributeBehavior::class,
//                'attributes' => [
//                    ActiveRecord::EVENT_AFTER_FIND => ['created_at'],
//                ],
//                'value' => function( $event ) {
//                    return date('Y-m-d H:i', $this->created_at );
//                }
//            ],
//            'updated.find' => [
//                'class'      => AttributeBehavior::class,
//                'attributes' => [
//                    ActiveRecord::EVENT_AFTER_FIND => ['updated_at'],
//                ],
//                'value' => function( $event ) {
//                        return date('Y-m-d H:i', $this->updated_at );
//                }
//            ]
        ];
    }

    /**
     * @return array
     */
    public static function getDropDownList( $config = [] ) : array {
        // prepare items:
        $query = static::find();
        $where = !empty( $config['where'] )? $config['where'] : false;
        if( is_array( $where ) )
            $query = $query->where( $where );
        $models = $query->all();
        $from = !empty( $config['from'] )? $config['from'] : 'id';
        $to = !empty( $config['to'] )? $config['to'] : 'name';
        $items = ArrayHelper::map( $models, $from, $to );
        // prepare params:
        $params = [];
        if( !empty( $config['selected'] ) ) {
            $selected = static::find()->where(['is_default' => 1])->one();
            if( $selected->id )
                $params = [
                    'options' => [
                        $selected->id => [ 'Selected' => true ]
                    ]
                ];
        }
        if( isset( $config['prompt'] ) )
            $params['prompt'] = $config['prompt'];

        return [ $items, $params ];
    }

    /**
     * @param bool $insert
     * @return bool
     */
    public function beforeSave( $insert ) {
        $result = $this->checkDefault ?
            $this->checkDefault() : true;

        return $result ?
            parent::beforeSave( $insert ) : false;
    }

    /**
     * @return bool
     */
    public function beforeDelete() : bool {
        if( $this->checkDefault && !empty( $this->is_default ) ) {
            \Yii::$app->getSession()->setFlash(
                'error',
                \Yii::t('app', 'Cannot delete default!' )
            );

            return false;
        }

        return parent::beforeDelete();
    }

    /**
     * @return bool
     */
    protected function checkDefault() :bool {
        $default = self::find()->where(['is_default' => 1 ])->one();

        if( $default && $this->is_default ) {
            if( $default->id != $this->id ) {
                $id = $default->id;
                try {
                    \Yii::$app->db->createCommand("UPDATE price SET `is_default`=0 WHERE `id`=$id")
                        ->execute();
                } catch( Exception $e ) {
                    \Yii::error( $e->getMessage() );

                    return false;
                }
            }
        } else if( !$default )
            $this->is_default = true;

        return true;
    }
}
