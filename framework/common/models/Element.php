<?php

namespace common\models;

use common\models\query\SpokeQuery;
use common\models\query\ElementQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "element".
 *
 * @property Spoke[] $spokes
 */
class Element extends CrudModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'element';
    }

    /**
     * @return array
     */
    public function getCodes(): array
    {
        return [
            'earth', 'earth-air', 'air', 'air-water',
            'water', 'water-fire', 'fire', 'fire-earth'
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lang_id', 'name', 'code'], 'required'],
            [['lang_id', 'icon_id', 'owner_id'], 'integer'],
            [['desc'], 'string'],
            [['code'], 'match', 'pattern' => '/^[a-z]\-+$/', 'message' => 'Code can only contain little latin characters'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['code'], 'string', 'max' => 10],
            [['name'], 'unique'],
            [['code', 'lang_id'], 'unique', 'targetAttribute' => ['code', 'lang_id']],
            [['icon_id'], 'exist', 'skipOnError' => true, 'targetClass' => ImageManager::class, 'targetAttribute' => ['icon_id' => 'id']],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['lang_id' => 'id']],
            [['owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner_id' => 'id']],
        ];
    }

    public function getColumns(): array
    {
        return [
            'id',
            'code',
            'langLabel',
            'imagePath:image',
            'name',
            'desc:ntext',
            'ownerName',
            'created_at:datetime',
            'updated_at:datetime',
        ];
    }

    /**
     * Gets query for [[Spokes]].
     *
     * @return \yii\db\ActiveQuery|SpokeQuery
     */
    public function getSpokes()
    {
        return $this->hasMany(Spoke::class, ['element_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return ElementQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new ElementQuery(get_called_class());
    }
}
