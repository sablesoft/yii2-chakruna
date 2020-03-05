<?php
namespace backend\controllers;

use backend\models\CrudController;

/**
 * LairController implements the CRUD actions for Lair model.
 */
class LairController extends CrudController
{
    protected $modelClass       = 'common\models\Lair';
    protected $searchModelClass = 'common\models\search\LairSearch';
}