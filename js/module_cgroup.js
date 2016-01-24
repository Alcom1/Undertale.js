//Group of enemies. D: Contains and manages
var Cgroup = (function()
{
    var enemies;    //List of enemies.
    var mercies;    //List of mercies.
    var defends;    //List of defends.
    
    //Setup
    function setup()
    {
        enemies = [
            new Cenemy(new Vect(185, 220, 0)),
            new Cenemy(new Vect(445, 220, 0))];
        mercies = ["|#FF0Spare", "Flee"];
        defends = [new Cdefend()];
        
        for(var i = 1; i <= 4; i ++)
        {
            (function(i)
            {
                var xhr = new XMLHttpRequest();
                xhr.overrideMimeType("application/json");
                xhr.onload = function()
                {
                    Cgroup.loadAnimation(0, xhr.responseText, new Vect(185, 170, 0));
                    Cgroup.loadAnimation(1, xhr.responseText, new Vect(445, 170, 0));
                }
                xhr.open('GET', "assets/animation_drone_" + i + ".json", true);
                xhr.send();
            }(i))
        }
    }
    
    //Load an animation
    function loadAnimation(index, text, pos)
    {
        enemies[index].addAnimation(text, pos);
    }

    //Update
    function update(dt)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].update(dt);
        }
    }
    
    //Draw
    function draw(ctx)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw(ctx);
        }   
    }
    
    //Geter for a defend.
    function getDefends()
    {
        return defends[0];
    }

    //Geter for an array of enemy names.
    function getNames()
    {
        var names = [];
        for(var i = 0; i < enemies.length; i++)
        {
            names.push(enemies[i].name);
        }
        return names;
    }
    
    //Getter for enemy text.
    function getText()
    {
        return enemies[0].texts[0];
    }
    
    //Getter for acts based on enemy index
    function getActs(selectStateEnemy)
    {
        return enemies[selectStateEnemy].acts;
    }
    
    //Getter for responses based on enemy index
    function getRes(selectStateEnemy, selectStateOther)
    {
        enemies[selectStateEnemy].ressFunctions[selectStateOther]();
        return enemies[selectStateEnemy].ress[selectStateOther];
    }
    
    //Getter for Health bar position based on enemy index
    function getDamagePos(selectStateEnemy)
    {
        return enemies[selectStateEnemy].damagePos;
    }
    
    //Getter for Health bar velocity based on enemy index
    function getDamageVel(selectStateEnemy)
    {
        return enemies[selectStateEnemy].damageVel;
    }
    
    //Get the maximum hp based on enemy index
    function getMaxHP(selectStateEnemy)
    {
        return enemies[selectStateEnemy].maxHP;
    }
    
    //Get the current hp based on enemy index
    function getCurHP(selectStateEnemy)
    {
        return enemies[selectStateEnemy].curHP;
    }
    
    //Get the bubble position based on enemy index
    function getBubblePos(selectStateEnemy)
    {
        return enemies[selectStateEnemy].bubblePos;
    }
    
    //Get the bubble offset based on enemy index
    function getBubbleOff(selectStateEnemy)
    {
        return enemies[selectStateEnemy].bubbleOff;
    }
    
    //Get all mercies.
    function getMercies()
    {
        return mercies;
    }
    
    //Get all crap.
    function dealDamage(selectStateEnemy, damage)
    {
        enemies[selectStateEnemy].curHP -=
            damage /
            enemies[selectStateEnemy].defense;
        if(enemies[selectStateEnemy].curHP < 0)
        {
            enemies[selectStateEnemy].curHP = 0;
            return true; 
        }
        return false;
    }
    
    //Return
    return {
        setup : setup,
        loadAnimation : loadAnimation,
        update : update,
        draw : draw,
        getDefends : getDefends,
        getNames : getNames,
        getText : getText,
        getActs : getActs,
        getRes : getRes,
        getDamagePos : getDamagePos,
        getDamageVel : getDamageVel,
        getMaxHP : getMaxHP,
        getCurHP : getCurHP,
        getBubblePos : getBubblePos,
        getBubbleOff : getBubbleOff,
        getMercies : getMercies,
        dealDamage : dealDamage,
    }
}());