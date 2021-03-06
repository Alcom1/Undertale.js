//Enemy Constructor
var Cenemy = function(pos)
{
    this.name = "MAD-" + (Math.random() * 652 + 79).toFixed();
    this.texts = ["* Spherical drones descend from the\nceiling!"];
    this.speech = ["Null", "Beep.", "Boop."];
    this.acts = ["Check", "Turn Off", "Stare"];
    this.ress = [
        "* " + this.name + "   2 ATK 12 DEF * Monitor & Defense drone. Someone\nmight get mad if you broke it.",
        "* You reach for the drone's off\nswitch.",
        "* You stare at the drone. It recorded\nthat you stared at it."];
    this.ressFunctions = [
        function()
        {
            console.log("actFunction 1");
        },
        function()
        {
            console.log("actFunction 2");
        },
        function()
        {
            console.log("actFunction 3");
        }];
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

//Add an animtion
Cenemy.prototype.addAnimation = function(text, pos)
{
    this.active = true;
    this.modelPoses.push(pos);
    var anim = JSON.parse(text);
    if(anim.image_id == "drone_2")
    {
        this.animations.push(new AnimationNum(anim, this.name));
    }
    else
    {
        this.animations.push(new Animation(anim));
    }
    this.sortAnimations();
}

//Sort animations
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

//Update
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

//Draw
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