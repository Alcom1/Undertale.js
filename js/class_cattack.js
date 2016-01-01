var Cattack = function()
{
    this.attackBox = document.getElementById("attack_box");
    
    this.ATTACK_STATE = Object.freeze(
    {
        HIT : 0,
        DAMAGE : 1
    });
}

Cattack.prototype.setup = function()
{
    this.attackBars = [[37], [0 - Math.random() * 50]];
    this.attackBars.push([this.attackBars[1][0] - 30 - Math.random() * 75]);
    this.attackState = this.ATTACK_STATE.HIT;
    this.attackBoxOpacity = 1;
}

Cattack.prototype.update = function(dt)
{
    switch(this.attackState)
    {
        case this.ATTACK_STATE.HIT:
            if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
            {
                this.attackBars.splice(0, 1);
            }
            if(this.attackBars.length < 1 || this.attackBars[this.attackBars.length - 1][0] > 640)
            {
                this.attackState = this.ATTACK_STATE.DAMAGE;
            }
            
            for (var i = 0; i < this.attackBars.length; i++)
            {
                this.attackBars[i][0] += 240 * dt;
            }
            break;
        case this.ATTACK_STATE.DAMAGE:
            this.attackBoxOpacity -= 2 * dt;
            if(this.attackBoxOpacity < 0)
            {
                this.attackBoxOpacity = 0;
                return false;
            }
            break;
    }
    
    return true;   
}

Cattack.prototype.draw = function(ctx)
{
    ctx.save();
    ctx.globalAlpha = this.attackBoxOpacity;
    ctx.drawImage(
		this.attackBox,
		37, 
		255);
    ctx.restore();
    
    ctx.save();
    switch(this.attackState)
    {
        case this.ATTACK_STATE.HIT:
            ctx.lineWidth = 4;
            
            for (var i = 0; i < this.attackBars.length; i++)
            {
                if(i)
                {
                    ctx.strokeStyle = "#FFF";
                    ctx.fillStyle = "#000";       
                }
                else
                {
                    ctx.strokeStyle = "#000";
                    ctx.fillStyle = "#FFF";     
                }
                ctx.beginPath();
                ctx.rect(this.attackBars[i][0], 258, 14, 125);
                ctx.fill();
                ctx.stroke();
            }
            break;
        case this.ATTACK_STATE.DAMAGE:
            break;
    }
    ctx.restore();
}

Cattack.prototype.getDamage = function(atk)
{
    return 0;
}