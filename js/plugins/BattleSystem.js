//Battle System; 

var BattleSystem = BattleSystem || {};

BattleSystem.calcDamageValue = function(source, target, damage, skill) {
    var value = 0;
    var atk = source.calcAtkPower(damage, target, skill);
    var def = target.calcDefPower(damage, source, skill);
    value = atk * def;
    return value;
};

Game_BattlerBase.prototype.calcAtkPower = function(damage, target, skill) {
    var value = 0;
    var source = this;
    var base = eval(damage.base);
    if(damage.rate instanceof Array) {
        var rate = this.calcSkillLevelValue(damage.rate, skill.id);
    } else {var rate = damage.rate;}
    value = base * (rate + 100) / 100;
    if (damage.hittype != null) {
        value *= (this[damage.hittype + "_assist"] + 100) / 100;
    }
    if (damage.element != null) {
        value *= (this[damage.element + "_assist"] + 100) / 100;
    }
    return value;
};

Game_BattlerBase.prototype.calcDefPower = function(damage, source, skill) {
    var armor_rate;
    if(damage.type == 'phy') {
        armor_rate = this.pdf / (this.pdf + 500 + this._level * 50);
    } else if(damage.type == 'mag') {
        armor_rate = this.mdf / (this.mdf + 500 + this._level * 50);
    } else if(damage.type == 'heal') {
        armor_rate = 2;
    } else {
        armor_rate = 0;
    }
    
    var hittype_rate;
    if (damage.hittype == null) {
        hittype_rate = 1;
    } else {
        hittype_rate = (100 - this[damage.hittype + '_resist']) / 100;
    }
    
    var element_rate;
    if (damage.element == null) {
        element_rate = 1;
    } else {
        element_rate = (100 - this[damage.element + '_resist']) / 100;
    }
    return (1 - armor_rate) * hittype_rate * element_rate;
};


// Game_Action =========================================================================================
Game_Action.prototype.itemCri = function(target) {
    return this.item().damage.critical ? this.subject().cri / (this.subject().cri + 200 + this.subject()._level * 10) : 0;
};


Game_Action.prototype.apply = function(target) {
    var result = target.result();
    var item = this.item();
    var subject = this.subject();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.missed = false;

    var hi = this.subject().hit;
    var ev = target.eva;
    result.evaded = (!this.isCertainHit())&&(Math.random() <= (1 - ((10 * hi)/(10 * hi + ev)) * (1 - ev / (10 * hi + ev))));

    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
        if (this.item().damages) {
            result.critical = this.item().kanarazuCri||(Math.random() < this.itemCri(target));
            var value = this.makeDamageValue(target, result.critical);
            this.executeDamage(target, value);
        }
        
        if (this.item().enchants) {
            this.item().enchants.forEach(function(enchant) {
                this.applyEnchant(item, enchant, subject, target);
            }, this);
        }
        
        
        this.item().effects.forEach(function(effect) {
            this.applyItemEffect(target, effect);
        }, this);
        this.applyItemUserEffect(target);
    } else {
        //Evasion response
        //target.onEvasion(this);
    }
};

Game_Action.prototype.applyEnchant = function(skill, enchant, source, target) {
    var state = DataManager.findState(enchant.iname);
    var param = enchant.param ? enchant.param : {};
    param = source.calcEnchantLevelValue(param, skill.id);
    param.skill = skill.id;
    param.enchanter = source;
    if (enchant.turns) {param.duration = enchant.turns; }
    target.addState(state.id, param);
};

Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var subject = this.subject();
    var baseValue = 0;
    
    //check normal attack
    if (subject.isActor()&&subject.currentClass().attack&&item.id == 1) {
        var damages = subject.currentClass().attack;
    } else {
        var damages = item.damages;
    }
    damages.forEach(function(d) {
        baseValue += BattleSystem.calcDamageValue(subject, target, d, item);
    });
    var value = baseValue;
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, 5);
    value = target.onPreDamage(value, subject, item);
    value = Math.round(value);
    return value;
};

Game_Action.prototype.applyCritical = function(damage) {
    if (!this.item().criBonus) {return damage * 1.5; }
    return damage * (150 + this.item().criBonus) / 100;
};