<?php

namespace common\models\search;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Cycle;
use common\behavior\DateFilterBehavior;

/**
 * CycleSearch represents the model behind the search form of `common\models\Cycle`.
 */
class CycleSearch extends Cycle
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'lang_id', 'icon_id', 'owner_id'], 'integer'],
            [['name', 'desc', 'created_at', 'updated_at'], 'safe'],
        ];
    }

    /**
     * @return array
     */
    public function behaviors() {
        return array_merge( parent::behaviors(), [
            DateFilterBehavior::class
        ]);
    }

    public function getColumns() : array
    {
        return [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'lang_id',
            [
                'attribute' => 'icon_id',
                'value' => function( $model ) {
                    /** @var Cycle $model */
                    return $model->imagePath;
                },
                'format' => 'image',
                'enableSorting' => false,
                'filter' => false
            ],
            'name',
            'desc:ntext',
            //'owner_id',
            //'created_at',
            //'updated_at',

            ['class' => 'yii\grid\ActionColumn'],
        ];

//        $columns = [
//            ['class' => 'yii\grid\SerialColumn'],
//            'name',
//            [
//                'attribute' => 'sex',
//                'value' => function ($model) {
//                    /** @var \common\models\Member $model */
//                    return $model->sexLabel;
//                },
//                'filter' => Member::getSexDropDownList()
//            ],
//            [
//                'attribute' => 'age',
//                'value' => function ($model) {
//                    /** @var \common\models\Member $model */
//                    return $model->ageLabel;
//                }
//            ],
//            [
//                'attribute' => 'group_id',
//                'value' => function ($model) {
//                    /** @var \common\models\Member $model */
//                    return $model->groupLabel;
//                },
//                'filter' => \common\models\Group::getDropDownList()[0]
//            ],
//            [
//                'attribute' => 'phone',
//                'value' => function ($model) {
//                    /** @var \common\models\Member $model */
//                    return $model->maskedPhone;
//                }
//            ],
//            'email:email',
//            'visitsCount:integer'
//        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Cycle::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'lang_id' => $this->lang_id,
            'icon_id' => $this->icon_id,
            'owner_id' => $this->owner_id
        ]);

        $query = $this->applyDateFilter( 'created_at', $query );
        $query = $this->applyDateFilter( 'updated_at', $query );

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'desc', $this->desc]);

        return $dataProvider;
    }
}
