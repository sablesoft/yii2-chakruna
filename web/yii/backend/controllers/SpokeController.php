<?php
namespace backend\controllers;

use backend\models\CrudController;

/**
 * SpokeController implements the CRUD actions for Spoke model.
 */
class SpokeController extends CrudController
{
    protected $modelClass       = 'common\models\Spoke';
    protected $searchModelClass = 'common\models\search\SpokeSearch';
}
