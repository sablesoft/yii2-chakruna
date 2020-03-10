<?php

namespace backend\controllers;

use backend\models\CrudController;

/**
 * CycleController implements the CRUD actions for Cycle model.
 */
class CycleController extends CrudController
{
    protected $modelClass       = 'common\models\Cycle';
    protected $searchModelClass = 'common\models\search\CycleSearch';
}
