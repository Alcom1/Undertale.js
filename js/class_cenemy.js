//Enemy object
var Cenemy = function(pos)
{
    this.name = "enemy";
    this.texts = ["* |#FF0JavaScript|#FFF is a high-level,  dynamic,  \nuntyped,  and interpreted programming \nlanguage.  -Wikipedia"];
    this.speech = ["Null", "Beep.", "Boop."];
    this.acts = ["Check", "Beep", "Boop"];
    this.ress = ["* Checking.", "* Beep.", "* Boop."];
    this.atk = 5;
    this.def = 5;
    this.maxHP = 200;
    this.curHP = 200;
    this.defense = 10;
    this.damagePos = pos;
    this.active = false;
}

Cenemy.prototype.setAnimation = function(text, pos)
{
    this.active = true;
    this.modelPos = pos;
    this.animation = new Animation(text, "teapot");
}

Cenemy.prototype.update = function(dt)
{
    if(this.active)
    {
        this.animation.update(dt);
    }
}

Cenemy.prototype.draw = function(ctx)
{
    if(this.active)
    {
        ctx.save();
        ctx.translate(this.modelPos.x, this.modelPos.y);
        this.animation.draw(ctx);
        ctx.restore();
    }
}