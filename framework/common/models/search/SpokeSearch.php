<?php

namespace common\models\search;

use common\models\Element;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Spoke;
use common\models\Language;

/**
 * SpokeSearch represents the model behind the search form of `common\models\Spoke`.
 */
class SpokeSearch extends Spoke
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'lang_id', 'element_id', 'icon_id', 'owner_id'], 'integer'],
            [['name', 'direction', 'desc', 'created_at', 'updated_at'], 'safe'],
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
                    /** @var Spoke $model */
                    return $model->langLabel;
                },
                'filter' => Language::getDropDownList()[0]
            ],
            [
                'attribute' => 'element_id',
                'value' => function ($model) {
                    /** @var Spoke $model */
                    return $model->element->name;
                },
                'filter' => Element::getDropDownList()[0]
            ],
            [
                'attribute' => 'icon_id',
                'value' => function( $model ) {
                    /** @var Spoke $model */
                    return $model->imagePath;
                },
                'format' => 'image',
                'enableSorting' => false,
                'filter' => false
            ],
            'name',
            //'direction',
            //'desc:ntext',
//            [
//                'attribute' => 'owner_id',
//                'value' => function ($model) {
//                    /** @var Spoke $model */
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
        $query = Spoke::find();

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
            'element_id' => $this->element_id,
            'icon_id' => $this->icon_id,
            'owner_id' => $this->owner_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'direction', $this->direction])
            ->andFilterWhere(['like', 'desc', $this->desc]);

        return $dataProvider;
    }
}
