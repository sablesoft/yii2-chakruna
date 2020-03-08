<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "setting".
 *
 * @property int $id
 * @property string $label Setting label
 * @property string $key Setting programmer code unique key
 * @property string $value Setting value
 * @property string $decodedValue Setting value
 * @property string $description Setting description
 * @property bool $isCheckDefault
 */
class Setting extends \yii\db\ActiveRecord {

    const SECTION_GALLERY = 'section.gallery';

    /** @var integer */
    protected $checkDefault;

    /**
     * @return bool
     */
    public function getIsCheckDefault() : bool {
        return (bool) $this->checkDefault;
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName() {
        return 'setting';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['label', 'key'], 'required'],
            [['description', 'value'], 'string'],
            [['label'], 'string', 'max' => 30],
            [['key'], 'string', 'max' => 30],
            [['label'], 'unique'],
            [['key'], 'unique']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels() {
        return [
            'id' => Yii::t('app', 'ID'),
            'label' => Yii::t('app', 'Label'),
            'key' => Yii::t('app', 'Key'),
            'value' => Yii::t('app', 'Value'),
            'description' => Yii::t('app', 'Description'),
        ];
    }

    /**
     * @return mixed|string
     */
    public function getDecodedValue() {
        try {
            if( !empty( $this->value ) ) {
                $value = json_decode( $this->value, true );
                if( !$value )
                    $value = $this->value;
            } else
                $value = $this->value;
        } catch( \Exception $e ) {}

        return $value;
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\SettingQuery the active query used by this AR class.
     */
    public static function find() {
        return new \common\models\query\SettingQuery(get_called_class());
    }

    /**
     * @param string $key
     * @param null|mixed $default
     * @return string|null
     */
    public static function findValue( string $key, $default = null ) {
        $setting = static::find()->oneByKey( $key );

        return $setting ? $setting->value : $default;
    }
}
