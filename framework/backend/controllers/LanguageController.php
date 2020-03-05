<?php
namespace backend\controllers;

use backend\models\CrudController;

/**
 * LanguageController implements the CRUD actions for Language model.
 */
class LanguageController extends CrudController
{
    protected $modelClass       = 'common\models\Language';
    protected $searchModelClass = 'common\models\search\LanguageSearch';
}