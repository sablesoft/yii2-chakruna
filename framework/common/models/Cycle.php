<?php

namespace common\models;

use Yii;
use common\models\query\LairQuery;
use common\models\query\CycleQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "cycle".
 *
 * @property int $id
 * @property int $lang_id Language ID
 * @property int|null $icon_id Cycle icon ID
 * @property string $name Cycle localized name
 * @property string|null $desc Cycle localized description
 * @property int $owner_id Owner
 * @property string $created_at Creation time
 * @property string $updated_at Last update time
 *
 * @property ImageManager $icon
 * @property User $owner
 * @property Lair[] $lairs
 */
class Cycle extends CrudModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cycle';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lang_id', 'name'], 'required'],
            [['lang_id', 'icon_id', 'owner_id'], 'integer'],
            [['desc'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['name'], 'unique'],
            [['icon_id'], 'exist', 'skipOnError' => true, 'targetClass' => ImageManager::class, 'targetAttribute' => ['icon_id' => 'id']],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['lang_id' => 'id']],
            [['owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner_id' => 'id']],
        ];
    }

    /**
     * Columns for view page
     *
     * @return array
     */
    public function getColumns() : array
    {
        return [
            'id',
            'lang_id',
            'imagePath:image',
            'name',
            'desc:ntext',
            'owner_id',
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
            'icon_id' => Yii::t('app', 'Icon'),
            'imagePath' => Yii::t('app', 'Icon'),
            'name' => Yii::t('app', 'Name'),
            'desc' => Yii::t('app', 'Desc'),
            'owner_id' => Yii::t('app', 'Owner ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    /**
     * Gets query for [[Icon]].
     *
     * @return \yii\db\ActiveQuery|
     */
    public function getIcon()
    {
        return $this->hasOne(ImageManager::class, ['id' => 'icon_id']);
    }

    /**
     * Gets query for [[Lairs]].
     *
     * @return \yii\db\ActiveQuery|LairQuery
     */
    public function getLairs()
    {
        return $this->hasMany(Lair::class, ['cycle_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return CycleQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new CycleQuery(get_called_class());
    }
}
