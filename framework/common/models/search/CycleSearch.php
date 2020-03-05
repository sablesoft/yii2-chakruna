<?php

namespace common\models\search;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Cycle;
use common\models\Language;

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
            [['name', 'desc', 'created_at', 'updated_at', 'code'], 'safe'],
        ];
    }

    public function getColumns() : array
    {
        return [
            ['class' => 'yii\grid\SerialColumn'],

//            'id',
            [
                'attribute' => 'code',
                'value' => function ($model) {
                    /** @var Cycle $model */
                    return $model->code;
                },
                'filter' => $this->codesFilter
            ],
            [
                'attribute' => 'lang_id',
                'value' => function ($model) {
                    /** @var Cycle $model */
                    return $model->langLabel;
                },
                'filter' => Language::getDropDownList(['to' => 'native_name'])[0]
            ],
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
//            [
//                'attribute' => 'owner_id',
//                'value' => function ($model) {
//                    /** @var Cycle $model */
//                    return $model->ownerUser->username;
//                },
//                'filter' => User::getDropDownList()[0]
//            ],
            'created_at:datetime',
            'updated_at:datetime',

            ['class' => 'yii\grid\ActionColumn']
        ];
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
            ->andFilterWhere(['like', 'code', $this->code])
            ->andFilterWhere(['like', 'desc', $this->desc]);

        return $dataProvider;
    }
}
