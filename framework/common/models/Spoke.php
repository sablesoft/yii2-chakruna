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
 * @property int|null $element_id Element ID
 *
 * @property Lair[] $lairs
 * @property Element $element
 * @property string $elementLabel
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
     * @return array
     */
    public function getCodes(): array
    {
        return [
            'e', 'ene', 'en', 'nne',
            'n', 'nnw', 'nw', 'wnw',
            'w', 'wsw', 'ws', 'ssw',
            's', 'sse', 'se', 'ese'
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'direction', 'code'], 'required'],
            [['lang_id', 'element_id', 'icon_id', 'owner_id'], 'integer'],
            [['desc'], 'string'],
            [['code'], 'match', 'pattern' => '/^[a-z-]/', 'message' => 'Code can only contain little latin characters'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['code'], 'string', 'max' => 10],
            [['direction'], 'string', 'max' => 5],
            [['name'], 'unique'],
            [['code', 'lang_id'], 'unique', 'targetAttribute' => ['code', 'lang_id']],
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
            'code',
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
        return array_merge(parent::attributeLabels(),[
            'element_id' => Yii::t('app', 'Element'),
            'elementLabel' => Yii::t('app', 'Element'),
            'direction' => Yii::t('app', 'Direction')
        ]);
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
     * {@inheritdoc}
     * @return SpokeQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new SpokeQuery(get_called_class());
    }
}
