// Combat attack module.
var Cattack = (function()
{
    var attackBox;      //Display for attack.
    
    var attackState;    //State of the attack.
    var ATTACK_STATE = Object.freeze(
    {
        HIT : 0,
        DAMAGE : 1
    });
    
    var attackBars;
    var attackFades;
    var attackBoxOpacity;
    var totalDamage;
    var damageDelayCounter;
    var damageDelay;
    
    function init()
    {
        attackBox = document.getElementById("attack_box");
    }
    
    function setup()
    {
        attackBars = [37, 0 - Math.random() * 75];
        attackBars.push(attackBars[1] - 30 - Math.random() * 75);
        attackFades = [];
        attackState = ATTACK_STATE.HIT;
        attackBoxOpacity = 1;
        totalDamage = 0;       
        damageDelayCounter = 0;
        damageDelay = 1;
    }
    
    function update(dt)
    {
        switch(attackState)
        {
            case ATTACK_STATE.HIT:
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    var hit = attackBars[0]
                    var damage = Math.max(0, 282 - Math.abs(hit - 312));
                    if(damage > 280)
                    {
                        damage *= 1.5;
                        attackFades.push([hit, 1, 1]);
                    }
                    else
                    {
                        attackFades.push([hit, 0, 1]);
                    }
                    
                    totalDamage += damage;
                    
                    attackBars.splice(0, 1);
                    if(attackBars.length > 0)
                    {
                        if(damage < 280)
                            Sound.playSound("hit_1", true);
                        else
                            Sound.playSound("hit_1_crit", true);
                    }
                    else
                    {
                        if(totalDamage < 1200)
                            Sound.playSound("hit_2", true);
                        else
                            Sound.playSound("hit_2_crit", true);
                    }
                }
                if(attackBars.length < 1 || attackBars[attackBars.length - 1] > 640)
                {
                    attackState = ATTACK_STATE.DAMAGE;
                }
                
                for (var i = 0; i < attackBars.length; i++)
                {
                    attackBars[i] += 240 * dt;
                }
                break;
            case ATTACK_STATE.DAMAGE:
                attackBoxOpacity -= 2 * dt;
                damageDelayCounter += dt;
                if(attackBoxOpacity < 0)
                {
                    attackBoxOpacity = 0;
                }
                if(damageDelayCounter > damageDelay)
                {
                    return -1;
                }
                break;
        }
                
        for (var i = 0; i < attackFades.length; i++)
        {
            attackFades[i][2] -= 2 * dt;
            if(attackFades[i][2] < 0)
            {
                attackFades[i][2] = 0;
            }
        }
        
        return totalDamage;          
    }
    
    function draw(ctx)
    {
        ctx.save();
        ctx.globalAlpha = attackBoxOpacity;
        ctx.drawImage(
            attackBox,
            37, 
            255);
        ctx.restore();
        
        ctx.save();
        switch(attackState)
        {
            case ATTACK_STATE.HIT:
                ctx.lineWidth = 4;
                
                for (var i = 0; i < attackBars.length; i++)
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
                    ctx.rect(attackBars[i], 258, 14, 125);
                    ctx.fill();
                    ctx.stroke();
                }
                break;
            case ATTACK_STATE.DAMAGE:
                break;
        }
                
        for (var i = 0; i < attackFades.length; i++)
        {
            ctx.save();
            ctx.globalAlpha = attackFades[i][2];
        
            switch(attackFades[i][1])
            {
                case 0:
                    ctx.fillStyle = "#0FF";                 
                    break;
                case 1:
                    if(Math.floor(attackFades[i][2] * 6) % 2)
                        ctx.fillStyle = "#F80";
                    else
                        ctx.fillStyle = "#0F0";  
                    break;
            }
            
            ctx.beginPath();
            ctx.rect(
                attackFades[i][0] - (1 - attackFades[i][2]) * 5,
                258 - (1 - attackFades[i][2]) * 40,
                14 + (1 - attackFades[i][2]) * 10,
                125 + (1 - attackFades[i][2]) * 80);
            ctx.fill(); 
            ctx.restore();     
        }
        ctx.restore();       
    }
    
    return {
        init : init,
        setup : setup,
        update : update,
        draw : draw
    }
}());