<?php

namespace common\models;

use Yii;
use common\models\query\CycleQuery;
use common\models\query\LairQuery;
use common\models\query\SpokeQuery;
use common\models\query\LanguageQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "lair".
 *
 * @property int $id
 * @property int $lang_id Language ID
 * @property int $cycle_id Cycle ID
 * @property int $spoke_id Spoke ID
 * @property int|null $icon_id Lair icon ID
 * @property string $name Lair localized name
 * @property string $period Lair localized period
 * @property string|null $desc Lair localized description
 * @property int $owner_id Owner
 * @property string $created_at Creation time
 * @property string $updated_at Last update time
 *
 * @property Cycle $cycle
 * @property ImageManager $icon
 * @property Language $lang
 * @property User $owner
 * @property Spoke $spoke
 */
class Lair extends CrudModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'lair';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lang_id', 'cycle_id', 'spoke_id', 'name', 'period'], 'required'],
            [['lang_id', 'cycle_id', 'spoke_id', 'icon_id', 'owner_id'], 'integer'],
            [['desc'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['period'], 'string', 'max' => 255],
            [['name'], 'unique'],
            [['cycle_id', 'spoke_id', 'lang_id'], 'unique', 'targetAttribute' => ['cycle_id', 'spoke_id', 'lang_id']],
            [['cycle_id'], 'exist', 'skipOnError' => true, 'targetClass' => Cycle::class, 'targetAttribute' => ['cycle_id' => 'id']],
            [['icon_id'], 'exist', 'skipOnError' => true, 'targetClass' => ImageManager::class, 'targetAttribute' => ['icon_id' => 'id']],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['lang_id' => 'id']],
            [['owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner_id' => 'id']],
            [['spoke_id'], 'exist', 'skipOnError' => true, 'targetClass' => Spoke::class, 'targetAttribute' => ['spoke_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'lang_id' => Yii::t('app', 'Lang ID'),
            'cycle_id' => Yii::t('app', 'Cycle ID'),
            'spoke_id' => Yii::t('app', 'Spoke ID'),
            'icon_id' => Yii::t('app', 'Icon'),
            'imagePath' => Yii::t('app', 'Icon'),
            'name' => Yii::t('app', 'Name'),
            'period' => Yii::t('app', 'Period'),
            'desc' => Yii::t('app', 'Desc'),
            'owner_id' => Yii::t('app', 'Owner ID'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    /**
     * Gets query for [[Cycle]].
     *
     * @return \yii\db\ActiveQuery|CycleQuery
     */
    public function getCycle()
    {
        return $this->hasOne(Cycle::class, ['id' => 'cycle_id']);
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
     * Gets query for [[Lang]].
     *
     * @return \yii\db\ActiveQuery|LanguageQuery
     */
    public function getLang()
    {
        return $this->hasOne(Language::class, ['id' => 'lang_id']);
    }

    /**
     * Gets query for [[Spoke]].
     *
     * @return \yii\db\ActiveQuery|SpokeQuery
     */
    public function getSpoke()
    {
        return $this->hasOne(Spoke::class, ['id' => 'spoke_id']);
    }

    /**
     * {@inheritdoc}
     * @return LairQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new LairQuery(get_called_class());
    }
}
