// Combat attack module.
var Cattack = (function()
{
    var attackBox;      //Display for attack.
    
    var attackState;    //State of the attack.
    var ATTACK_STATE = Object.freeze(
    {
        HIT : 0,        //State when dealing damage.
        SMASH : 1,      //State when showing smash effect.
        DAMAGE : 2      //Statr when displaying damage.
    });
    
    var attackBars;             //Bars representing each attack.
    var attackFades;            //Bars representing each fade effect where an attack occured.
    var attackBoxOpacity;       //Opacity of the attack box visual.
    var totalDamage;            //Total damage dealt by attacks.
    var smashDelayCounter;      //Counter for duration of smash effect.
    var smashDelay;             //Duration of the smash effect.
    var damageDelayCounter;     //Counter for duration of damage display.
    var damageDelay;            //Duration of the damage display that is seen after attacking.
    
    var healthPos;
    var healthWidth;
    
    //Init
    function init()
    {
        attackBox = document.getElementById("attack_box");
    }
    
    //Setup
    function setup()
    {
        attackBars = [37, 0 - Math.random() * 75];                  //First two attack bars.
        attackBars.push(attackBars[1] - 30 - Math.random() * 75);   //Second attack bar based on the first.
        attackFades = [];
        attackState = ATTACK_STATE.HIT;
        attackBoxOpacity = 1;
        totalDamage = 0;       
        smashDelayCounter = 0;
        smashDelay = 1.2;
        damageDelayCounter = 0;
        damageDelay = 2.2;
        
        healthWidth = Cgroup.getMaxHP(Combat.getSelectStateEnemy());
        healthPos = Cgroup.getDamagePos(Combat.getSelectStateEnemy()).get(); 
        healthPos.x -= healthWidth / 2; 
            
    }
    
    //Update
    function update(dt)
    {
        switch(attackState)
        {
            case ATTACK_STATE.HIT:
                //Z button to deal an attack. Attacks are based on and consume an attack bar.
                if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    //Attack
                    var hit = attackBars[0];                             //Hit at attack bar position.
                    var damage = Math.max(0, 282 - Math.abs(hit - 312)); //Damage based on hit.
                    if(damage > 280)            //Crit
                    {
                        damage *= 1.5;          //Crit multiplier
                        attackFades.push([hit, 1, 1]);
                    }
                    else                        //Normal hit
                    {
                        attackFades.push([hit, 0, 1]);
                    }
                    
                    totalDamage += damage;      //Increment damage
                    
                    attackBars.splice(0, 1);    //Remove the consumed attack bar.
                    
                    //Sfx for attack.
                    if(attackBars.length > 0)
                    {
                        if(damage < 280)
                            Sound.playSound("hit_1", true);
                        else
                            Sound.playSound("hit_1_crit", true);
                    }
                    else
                    {
                        if(damage < 280)
                            Sound.playSound("hit_2", true);
                        else
                            Sound.playSound("hit_2_crit", true);
                    }
                }
                
                //Go to damage state if no attacks are left or if the attacks are beyond the canvas.
                if(attackBars.length < 1 || attackBars[attackBars.length - 1] > 640)
                {
                    attackState = ATTACK_STATE.SMASH;
                }
                
                //Update attack bar positions.
                for (var i = 0; i < attackBars.length; i++)
                {
                    attackBars[i] += 240 * dt;
                }
                break;
            case ATTACK_STATE.SMASH:
                smashDelayCounter += dt;
                if(smashDelayCounter > smashDelay)
                {
                    attackState = ATTACK_STATE.DAMAGE
                }
            case ATTACK_STATE.DAMAGE:
                attackBoxOpacity -= 2 * dt; //Fade out the attack box.
                damageDelayCounter += dt;   //Increment the duration counter of the damage display.
                if(attackBoxOpacity < 0)    //Force attack box opacity to be 0 once it reaches 0.
                {
                    attackBoxOpacity = 0;
                }
                if(damageDelayCounter > damageDelay)    //Once duration is complete, return -1.
                {
                    return -1;
                }
                break;
        }
        
        //Update attack fade effects regardless of state.        
        for (var i = 0; i < attackFades.length; i++)
        {
            attackFades[i][2] -= 2 * dt;
            if(attackFades[i][2] < 0)
            {
                attackFades[i][2] = 0;
            }
        }
        
        //Return the totalDamage dealt.
        return totalDamage;          
    }
    
    //Draw
    function draw(ctx)
    {
        //Draw the attack box.
        ctx.save();
        ctx.globalAlpha = attackBoxOpacity;
        ctx.drawImage(
            attackBox,
            37, 
            255);
        ctx.restore();
        
        //Draw everything else.
        ctx.save();
        switch(attackState)
        {
            case ATTACK_STATE.HIT:
                //Draw attack bars.
                ctx.lineWidth = 4;
                for (var i = 0; i < attackBars.length; i++)
                {
                    if(i)   //Attack bars > 1 colors.
                    {
                        ctx.strokeStyle = "#FFF";
                        ctx.fillStyle = "#000";       
                    }
                    else    //Attack bar 0 color.
                    {
                        ctx.strokeStyle = "#000";
                        ctx.fillStyle = "#FFF";     
                    }
                    
                    //Draw bar.
                    ctx.beginPath();
                    ctx.rect(attackBars[i], 258, 14, 125);
                    ctx.fill();
                    ctx.stroke();
                }
                break;
            case ATTACK_STATE.SMASH:
                break;
            case ATTACK_STATE.DAMAGE:
                ctx.fillStyle = "#404040";
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.rect(
                    healthPos.x - .5,
                    healthPos.y - .5,
                    healthWidth,
                    15);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = "#0F0";
                ctx.fillRect(
                    healthPos.x - .5,
                    healthPos.y - .5,
                    Cgroup.getCurHP(Combat.getSelectStateEnemy()),
                    15);
                break;
        }
        
        //Draw attack fades.
        for (var i = 0; i < attackFades.length; i++)
        {
            ctx.save();
            ctx.globalAlpha = attackFades[i][2];    //Fade fadeout
            
            //Set style of each fade.
            switch(attackFades[i][1])
            {
                case 0:     //Normal
                    ctx.fillStyle = "#0FF";                 
                    break;
                case 1:     //Crit
                    if(Math.floor(attackFades[i][2] * 6) % 2)   //Flash between Green and Orange
                        ctx.fillStyle = "#F80";
                    else
                        ctx.fillStyle = "#0F0";  
                    break;
            }
            
            //Draw fade
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
    
    //Module return.
    return {
        init : init,
        setup : setup,
        update : update,
        draw : draw
    }
}());