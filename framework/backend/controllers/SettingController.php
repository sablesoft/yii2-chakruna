<?php
namespace backend\controllers;

use backend\models\CrudController;

/**
 * SettingController implements the CRUD actions for Setting model.
 */
class SettingController extends CrudController {

    protected $modelClass           = 'common\models\Setting';
    protected $searchModelClass     = 'common\models\search\SettingSearch';

}
