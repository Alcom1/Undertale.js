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
    this.maxHP = 2500;
    this.curHP = 2500;
}

Cenemy.prototype.update = function(dt)
{
    
}

Cenemy.prototype.draw = function(ctx)
{
    
}