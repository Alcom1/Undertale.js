//Group of enemies. D:
var Cgroup = (function()
{
    var enemies;
    var mercies;
    var defends;
    
    function init()
    {
        enemies = [new Cenemy(), new Cenemy()];
        mercies = ["|#FF0Spare", "Flee"];
        defends = [new Cdefend()];
    }

    function update(dt)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies.update(dt);
        }
    }

    function draw(ctx)
    {
        for(var i = 0; i < enemies.length; i++)
        {
            enemies.draw(ctx);
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

    function getMercies()
    {
        return mercies;
    }
    
    return {
        init : init,
        update : update,
        draw : draw,
        getDefends : getDefends,
        getNames : getNames,
        getText : getText,
        getActs : getActs,
        getRes : getRes,
        getMercies : getMercies
    }
}());