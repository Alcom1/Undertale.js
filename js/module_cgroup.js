//Group of enemies. D:
var Cgroup = (function()
{
    var enemies;
    var mercies;
    var defends;
    
    function init()
    {
        enemies = [
            new Cenemy(new Vect(185, 220, 0)),
            new Cenemy(new Vect(445, 220, 0))];
        mercies = ["|#FF0Spare", "Flee"];
        defends = [new Cdefend()];
        
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.onload = function()
        {
            Cgroup.loadAnimation(0, xhr.responseText, new Vect(185, 290, 0));
            Cgroup.loadAnimation(1, xhr.responseText, new Vect(445, 290, 0));
        }
        xhr.open('GET', "assets/animation.json", true);
        xhr.send();
    }
    
    function loadAnimation(index, text, pos)
    {
        enemies[index].setAnimation(text, pos);
    }

    function update(dt)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].update(dt);
        }
    }

    function draw(ctx)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw(ctx);
        }   
    }

    function getDefends()
    {
        return defends[0];
    }

    function getNames()
    {
        var names = [];
        for(var i = 0; i < enemies.length; i++)
        {
            names.push(enemies[i].name);
        }
        return names;
    }

    function getText()
    {
        return enemies[0].texts[0];
    }

    function getActs()
    {
        var acts = [];
        for(var i = 0; i < enemies.length; i++)
        {
            acts.push(enemies[i].acts);
        }
        return acts;
    }

    function getRes(selectStateEnemy, selectStateOther)
    {
        return enemies[selectStateEnemy].ress[selectStateOther]
    }
    
    function getDamagePos(selectStateEnemy)
    {
        return enemies[selectStateEnemy].damagePos;
    }
    
    function getDamageVel(selectStateEnemy)
    {
        return enemies[selectStateEnemy].damageVel;
    }
    
    function getMaxHP(selectStateEnemy)
    {
        return enemies[selectStateEnemy].maxHP;
    }
    
    function getCurHP(selectStateEnemy)
    {
        return enemies[selectStateEnemy].curHP;
    }
    
    function getBubblePos(selectStateEnemy)
    {
        return enemies[selectStateEnemy].bubblePos;
    }
    
    function getBubbleOff(selectStateEnemy)
    {
        return enemies[selectStateEnemy].bubbleOff;
    }

    function getMercies()
    {
        return mercies;
    }
    
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
    
    return {
        init : init,
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