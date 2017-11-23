

// Scene_Skill

function Scene_ActorSkill() {
    this.initialize.apply(this, arguments);
}

Scene_ActorSkill.prototype = Object.create(Scene_Base.prototype);
Scene_ActorSkill.prototype.constructor = Scene_ActorSkill;

Scene_ActorSkill.prototype.initialize = function(actor) {
    this._actor = actor;
    this._skillList = null;
    this._actorWindow = null;
    Scene_Base.prototype.initialize.call(this);
};


Scene_ActorSkill.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createActorWindow();
    this.createSkillList();
    this.createSkills();
    this.createButtons();
};

Scene_ActorSkill.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/bg/', 'bg_normal', 0, true);
    this._backgroundSprite.scale.x = Graphics.boxWidth / this._backgroundSprite.width;
    this._backgroundSprite.scale.y = Graphics.boxHeight / this._backgroundSprite.height;
    this.addChild(this._backgroundSprite);
};

Scene_ActorSkill.prototype.createActorWindow = function() {
    this._actorWindow = new Window_PartyActor(2, 100, 200, 710);
    this._actorWindow.setActor(this._actor);
    this._actorWindow._scrollable = false;
    this.addChild(this._actorWindow);
};

Scene_ActorSkill.prototype.createSkillList = function() {
    this._skillList = new Window_Scroll(200, 0, 1400, 900);
    this.addWindow(this._skillList);
    this._skillList.setScrollDirection(true, false);
    this._skillList.activate();
};

Scene_ActorSkill.prototype.createSkills = function() {
    var skill_obj_width = 1400;
    var skill_obj_height = 128;
    var skills = this._actor.skills();
    var skill;

    for (var i = 0; i < skills.length; i++) {
        skill = skills[i];
        var skillObjWindow = new Window_SkillObject(4, 128 * i + 4, skill_obj_width, skill_obj_height);
        skillObjWindow.setActor(this._actor);
        skillObjWindow.setSkill(skill);
        this._skillList.addChild(skillObjWindow);
    }

    this._skillList.setScrollLimit(0, 0, 0, 900 - skills.length * 130 - 100);
};

Scene_ActorSkill.prototype.createButtons = function() {
    //create back button
    var button = new Image_Button('back', 1600 - 112, 0, 112, 54);
    button._clickHandler = this.back.bind(this);
    this.addChild(button);
};

Scene_ActorSkill.prototype.back = function() {
    this.popScene();
};

//

function Window_SkillObject() {
    this.initialize.apply(this, arguments);
}

Window_SkillObject.prototype = Object.create(Window_ScrollObject.prototype);
Window_SkillObject.prototype.constructor = Window_SkillObject;

Window_SkillObject.prototype.initialize = function(x, y, width, height) {
    Window_ScrollObject.prototype.initialize.call(this, x, y, width, height);
    this._skill = null;
    this._actor = null;
    this._levelUpBtn = null;
};

Window_SkillObject.prototype.setActor = function(actor) {
    this._actor = actor;
    this.refresh();
};


Window_SkillObject.prototype.setSkill = function(skill) { // skill as an json object of $dataSkills
    this._skill = skill;
    this.refresh();
};

Window_SkillObject.prototype.skill = function() {
    return this._skill;
};

Window_SkillObject.prototype.actor = function() {
    return this._actor;
};

Window_SkillObject.prototype.refresh = function() {
    content = this._window;
    content.contents.clear();
    if (!(this.actor()&&this.skill())) return;

    content.drawIcon(this.skill().icon, 0, 0, 128, 128);
    content.drawText(this.skill().name, 130, 0, 400, 'left');
    content.drawTextExWithWidth(this.skill().description, 128, 30, 1200);
};