<?php /** @noinspection PhpPossiblePolymorphicInvocationInspection */

namespace common\behavior;

use yii\base\Behavior;
use common\models\Language;
use common\models\query\LanguageQuery;
use yii\db\ActiveQuery;

/**
 * Class LangBehavior
 * @package common\behavior
 *
 * @property Language|null $lang
 * @property string $langLabel
 */
class LangBehavior extends Behavior
{
    /** @var string  */
    public $langField = 'lang_id';

    /**
     * Gets query for [[Lang]].
     *
     * @return ActiveQuery|LanguageQuery
     */
    public function getLang()
    {
        return $this->owner->hasOne(Language::class, ['id' => $this->langField]);
    }

    /**
     * @return string
     */
    public function getLangLabel() : string
    {
        $lang = $this->getLang()->one();
        return $lang ? $lang->name : '';
    }
}
