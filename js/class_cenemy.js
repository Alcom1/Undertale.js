//Enemy object
var Cenemy = function(pos)
{
    this.name = "Utah Teapot";
    this.texts = ["* Teapots?", "* |#FF0JavaScript|#FFF is a high-level,  dynamic,  \nuntyped,  and interpreted programming \nlanguage.  -Wikipedia"];
    this.speech = ["Null", "Beep.", "Boop."];
    this.acts = ["Check"];
    this.ress = ["* Utah Teapot 3 ATK 7 DEF * Likes to test shaders in its free \ntime."];
    this.atk = 5;
    this.def = 5;
    this.maxHP = 200;
    this.curHP = 200;
    this.defense = 10;
    this.damageVel = 120;
    this.damagePos = pos;
    this.bubblePos = pos.getAdd(new Vect(80, -80, 0));
    this.bubbleOff = 30;
    this.active = false;
    this.modelPoses = [];
    this.animations = [];
}

Cenemy.prototype.addAnimation = function(text, pos)
{
    this.active = true;
    this.modelPoses.push(pos);
    this.animations.push(new Animation(text));
    this.sortAnimations();
}

Cenemy.prototype.sortAnimations = function()
{
    for(var i = this.animations.length - 1; i > 0; i--)
    {
        if(this.animations[i].zindex > this.animations[i - 1].zindex)
        {
            var temp = this.animations[i];
            this.animations[i] = this.animations[i - 1];
            this.animations[i - 1] = temp;
        }    
    }
}

Cenemy.prototype.update = function(dt)
{
    if(this.active)
    {
        for(var i = 0; i < this.animations.length; i++)
        {
            this.animations[i].update(dt);
        }
    }
}

Cenemy.prototype.draw = function(ctx)
{
    if(this.active)
    {
        for(var i = 0; i < this.animations.length; i++)
        {
            ctx.save();
            ctx.translate(this.modelPoses[i].x, this.modelPoses[i].y);
            this.animations[i].draw(ctx);
            ctx.restore();
        }
    }
}