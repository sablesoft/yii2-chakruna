{use class='frontend\assets\ClockAsset'}
{ClockAsset::register($this)|void}

<!-- MAIN BOARD -->
<div id="board">
    <div class="row">
        {foreach from=$wheels key=wheel item=config}
        <div id="{$wheel}" class="col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3">
            <div class="wheel">
                <img id="{$wheel}Wheel" class="img-responsive" src="img/wheel/wheelClean2.png">
                <div id="btn-{$config['type']}" class="btn btn-{$config['type']} {$config['class']}">
                    <i class="glyphicon glyphicon-{$config['icon']}"></i>
                </div>
            {foreach from=['right', 'top', 'left', 'bottom'] key=i item=part}
                <span class="label-wheel label-wheel-{$part} noselect">{Yii::t('app', "$wheel $part")}</span>
            {/foreach}
            </div>
            <div class="caption">
                <div class="btn-group house house-{$wheel}">
                    <button id="{$wheel}-next"
                            type="button" class="btn btn-lair btn-{$wheel}">
                        <i class="glyphicon glyphicon-chevron-left"></i>
                    </button>
                    <button id="{$wheel}-lair"
                            type="button" class="btn btn-lair btn-home btn-{$wheel}">
                        {$wheel} house
                    </button>
                    <button id="{$wheel}-prev"
                            type="button" class="btn btn-lair btn-{$wheel}">
                        <i class="glyphicon glyphicon-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
        {/foreach}
    </div>
</div>

<!-- FORM -->
<div id="form">
    <div class="row">
        <form id="inForm" name="inForm" action="" class="form-horizontal">
            <div id="datetime"
                 class="col-lg-5 col-md-6 col-md-offset-0 col-sm-11 col-sm-offset-1 col-xs-12">
                <div class="form-group">
                    <div class="row">
                        <label id='label-date' for="date" data-tip="date"
                               class="col-lg-3 col-sm-offset-0
                                col-xs-2 col-xs-offset-2 control-label tip">Date:</label>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5">
                            <input  id="datepicker" data-tip="date"
                                    type="text" name="date" class="input-sm form-control tip">
                        </div>
                        <div class="clearfix form-br visible-xs-block"></div>
                        <label id='label-time' for="time" data-tip="time"
                               class="col-sm-2 col-sm-offset-0
                                col-xs-3 col-xs-offset-2 control-label tip">Time:</label>
                        <div class="col-lg-3 col-md-3 col-sm-2 col-xs-3">
                            <input type="time" name="time" data-tip="time"
                                   class="input-sm form-control tip">
                        </div>
                    </div>
                </div>
            </div>
            <div id="location"
                 class="col-lg-7 col-md-6 col-md-offset-0 col-sm-11 col-sm-offset-1 col-xs-12">
                <div class="form-group">
                    <div class="row">
                        <label id='label-local' for="local" data-tip="localList"
                               class="col-sm-offset-0
                                 col-xs-2 col-xs-offset-2 control-label tip">Locale:</label>
                        <div class="col-md-3 col-sm-4 col-xs-5">
                            <input id='local-list' list="local" name="local"
                                   class="input-sm form-control tip" data-tip="localList">
                            <datalist id="local"></datalist>
                        </div>
                        <div class="clearfix form-br visible-xs-block"></div>
                        <label for="gps" data-tip="gps"
                               class="col-sm-offset-0 tip
                                col-xs-1 col-xs-offset-2 control-label">GPS:</label>
                        <div class="col-lg-2 col-md-3 col-sm-2 col-xs-3">
                            <input name="lat" type="number" step=0.01
                                   class="input-sm form-control tip" data-tip="lat">
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-2 col-xs-3">
                            <input name="lng" type="number" step=0.01
                                   class="input-sm form-control tip" data-tip="lng">
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="clearfix fixed-form-up visible-lg-block visible-md-block"></div>
    </div>
</div>

<!-- NAVBARS -->
<div id="xs-nav" class="visible-xs-block">
    <div class="btn-group btn-group-vertical">
        <a id='btn-xs-up' data-tip="btn-up"
           class="btn btn-success tip" href="#sun-anchor-xs">
            <i class="glyphicon glyphicon-chevron-up"></i>
        </a>
        <a id='btn-xs-down' data-tip="btn-down"
           class="btn btn-success tip" href="#earth-xs-anchor">
            <i class="glyphicon glyphicon-chevron-down"></i>
        </a>
    </div>
</div>
<div id="xs-menu" class="visible-xs-block">
    <div class="btn-group btn-group-vertical">
        <button id='btn-now-xs' data-tip="btn-now"
                class="btn btn-success btn-now tip">
            <i class="glyphicon glyphicon-grain"></i>
        </button>
        <button id='btn-show-xs' data-tip="btn-show"
                class="btn btn-info btn-show tip">
            <i class="glyphicon glyphicon-sunglasses"></i>
        </button>
        <button id='btn-save-xs' data-tip="btn-save"
                class="btn btn-warning btn-save tip">
            <i class="glyphicon glyphicon-record"></i>
        </button>
    </div>
</div>
<div id="sm-nav" class="visible-sm-block">
    <div class="btn-group btn-group-vertical">
        <a id='btn-sm-up' data-tip="btn-up"
           class="btn btn-success tip" href="#sun-anchor">
            <i class="glyphicon glyphicon-chevron-up"></i>
        </a>
        <a id='btn-sm-down' data-tip="btn-down"
           class="btn btn-success tip" href="#earth-anchor">
            <i class="glyphicon glyphicon-chevron-down"></i>
        </a>
    </div>
</div>
<div id="sm-menu" class="visible-sm-block">
    <div class="btn-group btn-group-vertical">
        <button id='btn-now-sm' data-tip="btn-now"
                class="btn btn-success btn-now tip">
            <i class="glyphicon glyphicon-grain"></i>
        </button>
        <button id='btn-show-sm' data-tip="btn-show"
                class="btn btn-info btn-show tip">
            <i class="glyphicon glyphicon-sunglasses"></i>
        </button>
        <button id='btn-save-sm' data-tip="btn-save"
                class="btn btn-warning btn-save tip">
            <i class="glyphicon glyphicon-record"></i>
        </button>
    </div>
</div>
