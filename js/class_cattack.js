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
    this.attackBars = [37, 0 - Math.random() * 75];
    this.attackBars.push(this.attackBars[1] - 30 - Math.random() * 75);
    this.attackFades = [];
    this.attackState = this.ATTACK_STATE.HIT;
    this.attackBoxOpacity = 1;
    this.totalDamage = 0;
}

Cattack.prototype.update = function(dt)
{
    switch(this.attackState)
    {
        case this.ATTACK_STATE.HIT:
            if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
            {
                var hit = this.attackBars[0]
                var damage = Math.max(0, 282 - Math.abs(hit - 312));
                if(damage > 280)
                {
                    damage *= 1.5;
                    this.attackFades.push([hit, 1, 1]);
                }
                else
                {
                    this.attackFades.push([hit, 0, 1]);
                }
                
                this.totalDamage += damage;
                
                this.attackBars.splice(0, 1);
                if(this.attackBars.length > 0)
                {
                    if(damage < 280)
                        app.main.sound.playSound("hit_1", true);
                    else
                        app.main.sound.playSound("hit_1_crit", true);
                }
                else
                {
                    if(this.totalDamage < 1200)
                        app.main.sound.playSound("hit_2", true);
                    else
                        app.main.sound.playSound("hit_2_crit", true);
                }
            }
            if(this.attackBars.length < 1 || this.attackBars[this.attackBars.length - 1] > 640)
            {
                this.attackState = this.ATTACK_STATE.DAMAGE;
            }
            
            for (var i = 0; i < this.attackBars.length; i++)
            {
                this.attackBars[i] += 240 * dt;
            }
            break;
        case this.ATTACK_STATE.DAMAGE:
            this.attackBoxOpacity -= 2 * dt;
            if(this.attackBoxOpacity < 0)
            {
                this.attackBoxOpacity = 0;
                return -1;
            }
            break;
    }
            
    for (var i = 0; i < this.attackFades.length; i++)
    {
        this.attackFades[i][2] -= 2 * dt;
        if(this.attackFades[i][2] < 0)
        {
            this.attackFades[i][2] = 0;
        }
    }
    
    return this.totalDamage;   
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
                ctx.rect(this.attackBars[i], 258, 14, 125);
                ctx.fill();
                ctx.stroke();
            }
            break;
        case this.ATTACK_STATE.DAMAGE:
            break;
    }
            
    for (var i = 0; i < this.attackFades.length; i++)
    {
        ctx.save();
        ctx.globalAlpha = this.attackFades[i][2];
       
        switch(this.attackFades[i][1])
        {
            case 0:
                ctx.fillStyle = "#0FF";                 
                break;
           case 1:
                if(Math.floor(this.attackFades[i][2] * 6) % 2)
                    ctx.fillStyle = "#F80";
                else
                    ctx.fillStyle = "#0F0";  
                break;
        }
        
        ctx.beginPath();
        ctx.rect(
            this.attackFades[i][0] - (1 - this.attackFades[i][2]) * 5,
            258 - (1 - this.attackFades[i][2]) * 40,
            14 + (1 - this.attackFades[i][2]) * 10,
            125 + (1 - this.attackFades[i][2]) * 80);
        ctx.fill(); 
        ctx.restore();     
    }
    ctx.restore();
}

Cattack.prototype.getDamage = function(atk)
{
    return 0;
}