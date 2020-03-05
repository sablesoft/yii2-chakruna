<?php

namespace common\models\search;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Lair;
use common\models\Cycle;
use common\models\Spoke;
use common\models\Language;

/**
 * LairSearch represents the model behind the search form of `common\models\Lair`.
 */
class LairSearch extends Lair
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'lang_id', 'cycle_id', 'spoke_id', 'icon_id', 'owner_id'], 'integer'],
            [['name', 'period', 'desc', 'created_at', 'updated_at'], 'safe'],
        ];
    }

    public function getColumns(): array
    {
        return [
            ['class' => 'yii\grid\SerialColumn'],

//            'id',
            [
                'attribute' => 'lang_id',
                'value' => function ($model) {
                    /** @var Lair $model */
                    return $model->langLabel;
                },
                'filter' => Language::getDropDownList()[0]
            ],
            [
                'attribute' => 'cycle_id',
                'value' => function ($model) {
                    /** @var Lair $model */
                    return $model->cycle->name;
                },
                'filter' => Cycle::getDropDownList()[0]
            ],
            [
                'attribute' => 'spoke_id',
                'value' => function ($model) {
                    /** @var Lair $model */
                    return $model->spoke->name;
                },
                'filter' => Spoke::getDropDownList()[0]
            ],
//            [
//                'attribute' => 'icon_id',
//                'value' => function( $model ) {
//                    /** @var Lair $model */
//                    return $model->imagePath;
//                },
//                'format' => 'image',
//                'enableSorting' => false,
//                'filter' => false
//            ],
            'name',
//            'period',
            //'desc:ntext',
//            [
//                'attribute' => 'owner_id',
//                'value' => function ($model) {
//                    /** @var Lair $model */
//                    return $model->ownerUser->username;
//                },
//                'filter' => User::getDropDownList()[0]
//            ],
            'created_at:datetime',
            'updated_at:datetime',

            ['class' => 'yii\grid\ActionColumn'],
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
        $query = Lair::find();

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
            'cycle_id' => $this->cycle_id,
            'spoke_id' => $this->spoke_id,
            'icon_id' => $this->icon_id,
            'owner_id' => $this->owner_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'period', $this->period])
            ->andFilterWhere(['like', 'desc', $this->desc]);

        return $dataProvider;
    }
}
