<?php

namespace common\models;

use Yii;
use common\models\query\CycleQuery;
use common\models\query\LairQuery;
use common\models\query\SpokeQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "lair".
 *
 * @property int $cycle_id Cycle ID
 * @property int $spoke_id Spoke ID
 * @property string $period Lair localized period
 *
 * @property Cycle $cycle
 * @property string $cycleLabel
 * @property Spoke $spoke
 * @property string $spokeLabel
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
     * @return array
     */
    public function getCodes(): array
    {
        return [
            'earth-e', 'earth-ene', 'earth-en', 'earth-nne',
            'earth-n', 'earth-nnw', 'earth-nw', 'earth-wnw',
            'earth-w', 'earth-wsw', 'earth-ws', 'earth-ssw',
            'earth-s', 'earth-sse', 'earth-se', 'earth-ese',
            'moon-e', 'moon-ene', 'moon-en', 'moon-nne',
            'moon-n', 'moon-nnw', 'moon-nw', 'moon-wnw',
            'moon-w', 'moon-wsw', 'moon-ws', 'moon-ssw',
            'moon-s', 'moon-sse', 'moon-se', 'moon-ese',
            'sun-e', 'sun-ene', 'sun-en', 'sun-nne',
            'sun-n', 'sun-nnw', 'sun-nw', 'sun-wnw',
            'sun-w', 'sun-wsw', 'sun-ws', 'sun-ssw',
            'sun-s', 'sun-sse', 'sun-se', 'sun-ese'
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lang_id', 'cycle_id', 'spoke_id', 'name', 'period', 'code'], 'required'],
            [['lang_id', 'cycle_id', 'spoke_id', 'icon_id', 'owner_id'], 'integer'],
            [['desc'], 'string'],
            [['code'], 'match', 'pattern' => '/^[a-z-]/', 'message' => 'Code can only contain little latin characters'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 20],
            [['code'], 'string', 'max' => 10],
            [['period'], 'string', 'max' => 255],
            [['name'], 'unique'],
            [['code', 'lang_id'], 'unique', 'targetAttribute' => ['code', 'lang_id']],
            [['cycle_id', 'spoke_id', 'lang_id'], 'unique', 'targetAttribute' => ['cycle_id', 'spoke_id', 'lang_id']],
            [['cycle_id'], 'exist', 'skipOnError' => true, 'targetClass' => Cycle::class, 'targetAttribute' => ['cycle_id' => 'id']],
            [['icon_id'], 'exist', 'skipOnError' => true, 'targetClass' => ImageManager::class, 'targetAttribute' => ['icon_id' => 'id']],
            [['lang_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['lang_id' => 'id']],
            [['owner_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner_id' => 'id']],
            [['spoke_id'], 'exist', 'skipOnError' => true, 'targetClass' => Spoke::class, 'targetAttribute' => ['spoke_id' => 'id']],
        ];
    }

    public function getColumns(): array
    {
        return [
            'id',
            'code',
            'langLabel',
            'cycleLabel',
            'spokeLabel',
            'imagePath:image',
            'name',
            'period',
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
            'cycle_id' => Yii::t('app', 'Cycle'),
            'spoke_id' => Yii::t('app', 'Spoke'),
            'cycleLabel' => Yii::t('app', 'Cycle'),
            'spokeLabel' => Yii::t('app', 'Spoke'),
            'period' => Yii::t('app', 'Period')
        ]);
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
     * @return string
     */
    public function getCycleLabel() : string
    {
        return ($cycle = $this->cycle) ? $cycle->name : '';
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
     * @return string
     */
    public function getSpokeLabel() : string
    {
        return ($spoke = $this->spoke) ? $spoke->name : '';
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
