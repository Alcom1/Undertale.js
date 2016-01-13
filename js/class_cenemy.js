//Enemy object
var Cenemy = function()
{
    this.name = "enemy";
    this.texts = ["* |#FF0JavaScript|#FFF is a high-level,  dynamic,  \nuntyped,  and interpreted programming \nlanguage.  -Wikipedia"];
    this.speech = ["Null", "Beep.", "Boop."];
    this.acts = ["Check", "Beep", "Boop"];
    this.ress = ["* Checking.", "* Beep.", "* Boop."];
    this.atk = 5;
    this.def = 5;
    this.maxHP = 200;
    this.curHP = 100;
    this.defense = 20;
    this.damagePos = new Vect(320, 200, 0);
}

Cenemy.prototype.update = function(dt)
{
    
}

Cenemy.prototype.draw = function(ctx)
{
    
}