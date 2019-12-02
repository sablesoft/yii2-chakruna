<?php
namespace common\widgets;

use Yii;

/**
 * Class LanguageNav
 * @package common\widgets
 */
class LanguageNav extends \yii\bootstrap\Nav {

    private static $_labels;

    private $_isError;

    public function init() {
        $route = Yii::$app->controller->route;
        $appLanguage = Yii::$app->language;
        $params = $_GET;
        $this->_isError = $route === Yii::$app->errorHandler->errorAction;


        array_unshift($params, '/' . $route);

        $items = ['<li class="dropdown-header">' .
            Yii::t('docker', 'Choose your language') . '</li>'];
        foreach (Yii::$app->urlManager->languages as $language) {
            $isWildcard = substr($language, -2) === '-*';
            if (
                $language === $appLanguage ||
                // Also check for wildcard language
                $isWildcard && substr($appLanguage, 0, 2)
                === substr($language, 0, 2)
            ) {
                continue;   // Exclude the current language
            }
            if ($isWildcard) {
                $language = substr($language, 0, 2);
            }
            $params['language'] = $language;
            $items[] = [
                'label' => self::label($language),
                'url' => $params,
            ];
        }

        $this->items = [
            [
                'label' => static::label( $appLanguage ) . ' ',
                'items' => $items,
                'dropDownOptions' => [
                    'role' => 'menu',
                    'aria-labelledby' => 'dLabel'
                ]
            ]
        ];

        parent::init();
    }

    /**
     * @return string
     */
    public function run() : string {
        if ($this->_isError) {
            return '';
        } else {
            return parent::run();
        }
    }

    /**
     * @param string $code
     * @return mixed|null
     */
    public static function label( string $code ) {
        if (self::$_labels === null) {
            self::$_labels = [
                'ru' => Yii::t('docker', 'Russian'),
                'en' => Yii::t('docker', 'English'),
            ];
        }

        return isset(self::$_labels[$code]) ? self::$_labels[$code] : null;
    }
}
