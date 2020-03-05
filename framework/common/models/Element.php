<?php

namespace common\models;

use Yii;
use common\models\query\SpokeQuery;
use common\models\query\ElementQuery;
use common\models\query\LanguageQuery;
use noam148\imagemanager\models\ImageManager;

/**
 * This is the model class for table "element".
 *
 * @property int $id
 * @property int $lang_id Language ID
 * @property int|null $icon_id Element icon ID
 * @property string $name Element localized name
 * @property string|null $desc Element localized description
 * @property int|null $owner_id Owner
 * @property string $created_at Creation time
 * @property string $updated_at Last update time
 *
 * @property ImageManager $icon
 * @property Language $lang
 * @property User $owner
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

    public function getColumns(): array
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
     * Gets query for [[Lang]].
     *
     * @return \yii\db\ActiveQuery|LanguageQuery
     */
    public function getLang()
    {
        return $this->hasOne(Language::class, ['id' => 'lang_id']);
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
