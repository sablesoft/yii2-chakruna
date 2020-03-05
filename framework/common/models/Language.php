<?php

namespace common\models;

use Yii;
use common\models\query\LairQuery;
use common\models\query\SpokeQuery;
use common\models\query\CycleQuery;
use common\models\query\ElementQuery;
use common\models\query\LanguageQuery;

/**
 * This is the model class for table "language".
 *
 * @property string $native_name Language native name
 *
 * @property Cycle[] $cycles
 * @property Element[] $elements
 * @property Lair[] $lairs
 * @property Spoke[] $spokes
 */
class Language extends CrudModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'language';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['code', 'name', 'native_name'], 'required'],
            [['owner_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['code'], 'string', 'max' => 5],
            [['name', 'native_name'], 'string', 'max' => 20],
            [['code'], 'unique'],
            [['name'], 'unique'],
            [['native_name'], 'unique'],
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
            'name',
            'native_name',
            'ownerName',
            'created_at:datetime',
            'updated_at:datetime',
        ];
    }

    /**
     * @return $this|LanguageQuery|\yii\db\ActiveQuery
     */
    public function getLang()
    {
        return $this;
    }

    /**
     * @return string
     */
    public function getLangLabel()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'code' => Yii::t('app', 'Code'),
            'name' => Yii::t('app', 'Name'),
            'native_name' => Yii::t('app', 'Native Name'),
            'owner_id' => Yii::t('app', 'Owner'),
            'ownerName' => Yii::t('app', 'Owner'),
            'created_at' => Yii::t('app', 'Created At'),
            'updated_at' => Yii::t('app', 'Updated At'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery|CycleQuery
     */
    public function getCycles()
    {
        return $this->hasMany(Cycle::class, ['lang_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery|ElementQuery
     */
    public function getElements()
    {
        return $this->hasMany(Element::class, ['lang_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery|LairQuery
     */
    public function getLairs()
    {
        return $this->hasMany(Lair::class, ['lang_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery|SpokeQuery
     */
    public function getSpokes()
    {
        return $this->hasMany(Spoke::class, ['lang_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return LanguageQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new LanguageQuery(get_called_class());
    }
}
