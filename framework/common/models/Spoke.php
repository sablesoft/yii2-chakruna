<?php

namespace common\models;

use Yii;
use common\models\query\LairQuery;
use common\models\query\SpokeQuery;
use common\models\query\ElementQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "spoke".
 *
 * @property int $id
 * @property int|null $lang_id Language ID
 * @property int|null $element_id Element ID
 * @property int|null $icon_id Spoke icon ID
 * @property string $name Spoke localized name
 * @property string $direction Spoke direction
 * @property string|null $desc Spoke localized description
 * @property int $owner_id Owner
 * @property string $created_at Creation time
 * @property string $updated_at Last update time
 *
 * @property Lair[] $lairs
 * @property Element $element
 * @property string $elementLabel
 * @property ImageManager $icon
 * @property User $owner
 */
class Spoke extends CrudModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'spoke';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lang_id', 'element_id', 'icon_id', 'owner_id'], 'integer'],
            [['name', 'direction'], 'required'],
            [['desc'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['direction'], 'string', 'max' => 5],
            [['name'], 'unique'],
            [['direction', 'lang_id'], 'unique', 'targetAttribute' => ['direction', 'lang_id']],
            [['element_id'], 'exist', 'skipOnError' => true, 'targetClass' => Element::class, 'targetAttribute' => ['element_id' => 'id']],
            [['icon_id'], 'exist', 'skipOnError' => true, 'targetClass' => ImageManager::class, 'targetAttribute' => ['icon_id' => 'id']],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['lang_id' => 'id']],
            [['owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner_id' => 'id']],
        ];
    }

    /**
     * @return array
     */
    public function getColumns(): array
    {
        return [
            'id',
            'langLabel',
            'elementLabel',
            'imagePath:image',
            'name',
            'direction',
            'desc:ntext',
            'ownerName',
            'created_at:datetime',
            'updated_at:datetime',
        ];
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
            'element_id' => Yii::t('app', 'Element'),
            'elementLabel' => Yii::t('app', 'Element'),
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
     * Gets query for [[Lairs]].
     *
     * @return \yii\db\ActiveQuery|LairQuery
     */
    public function getLairs()
    {
        return $this->hasMany(Lair::class, ['spoke_id' => 'id']);
    }

    /**
     * Gets query for [[Element]].
     *
     * @return \yii\db\ActiveQuery|ElementQuery
     */
    public function getElement()
    {
        return $this->hasOne(Element::class, ['id' => 'element_id']);
    }

    /**
     * @return string
     */
    public function getElementLabel() : string
    {
        return ($element = $this->element) ? $element->name : '';
    }

    /**
     * Gets query for [[Icon]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIcon()
    {
        return $this->hasOne(ImageManager::class, ['id' => 'icon_id']);
    }

    /**
     * {@inheritdoc}
     * @return SpokeQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new SpokeQuery(get_called_class());
    }
}
