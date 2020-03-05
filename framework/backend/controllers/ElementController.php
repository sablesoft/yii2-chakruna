<?php
namespace backend\controllers;

use backend\models\CrudController;

/**
 * ElementController implements the CRUD actions for Element model.
 */
class ElementController extends CrudController
{
    protected $modelClass       = 'common\models\Element';
    protected $searchModelClass = 'common\models\search\ElementSearch';
}