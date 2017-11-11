// Event Responses
var EventResponseData = EventResponseData || {};

//on pre damage
Game_Battler.prototype.onPreDamage = function (value, source, action) {
	var dmg = value;
    var states = this._states;

    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.onPreDamage) {
            eval(masterState.onPreDamage);
        }
    }

    if(!this.isActor()){return dmg;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onPreDamage){
            eval(skill.onPreDamage);
        }
    }
	return dmg;
};

//onDamage
Game_Battler.prototype.onDamage = function(action, value) {
    this.removeStatesByDamage();
    this.chargeTpByDamage(value / this.mhp);
   
    
    var a = action.subject();
    var b = this;
    var states = this._states;
    var dmg = value;

    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.onDamage) {
            eval(masterState.onDamage);
        }
    }

    if(!this.isActor()){return;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onDamage){
            eval(skill.onDamage);
        }
    }
};


Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    if (value > 0) {
        target.onDamage(this, value);
    }
    target.gainHp(-value);
    this.gainDrainedHp(value);
};

//onTurnStart
// need yep battle engine core
Game_Battler.prototype.onTurnStart = function() {
    this.updateStateTurnStart();
    //=======================================================================================
    var states = this._states;
    var a = this;

    // resolve state resist
    for (var i = 0; i < states.length; i++) {
        if (this[states[i].iname + '_resist']&&Math.random() * 100 <= this[states[i].inaem + 'resist']) {
            states[i].remove();
        }
    }


    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.onTurnStart) {
            eval(masterState.onTurnStart);
        }
    }

    if(!this.isActor()){return;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onTurnStart){
            eval(skill.onTurnStart);
        }
    }
};

// onTurnEnd
//need yep battle engine core
Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    if (BattleManager.isTurnBased()) {
      this.regenerateAll();
    } else if (BattleManager.isTickBased() && !BattleManager.isTurnEnd()) {
      this.regenerateAll();
    }
    this.removeStatesAuto(2);
    //=================================================================================
    var states = this._states;
    var a = this;

    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.dot) {
            this.gainHp(-masterState.dot);
        }
        if (masterState.onTurnEnd) {
            eval(masterState.onTurnEnd);
        }
    }

    if(!this.isActor()){return;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onTurnEnd){
            eval(skill.onTurnEnd);
        }
    }
};

//onStateRemove
// see Lohengrin_MasterState.js

//onEvasion
Game_Battler.prototype.onEvasion = function(action) {
    var a = action.subject();
    var b = this;
    
    var states = this._states;
    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.onEvasion) {
            eval(masterState.onEvasion);
        }
    }

    if(!this.isActor()){return;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onEvasion){
            eval(skill.onEvasion);
        }
    }
};

//OnActionEnd

BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else {
        this.endAction();
    }
};

BattleManager.endAction = function() {
    this._logWindow.endAction(this._subject);
    this._subject.onActionEnd(this._action, this._subject._lastTargetIndex);
    this._phase = 'turn';
};

Game_Battler.prototype.onActionEnd = function(action, target) {

    var states = this._states;
    for (var i = 0; i < states.length; i++){
        var masterState = states[i];
        if (masterState.onActionEnd) {
            eval(masterState.onActionEnd);
        }
    }

    if(!this.isActor()){return;}

    var skills = this.skills();
    var equips = this.equips();

    for (var i = 0; i < skills.length; i++){
        var skill = skills[i];
        if (skill.onActionEnd){
            eval(skill.onActionEnd);
        }
    }
};