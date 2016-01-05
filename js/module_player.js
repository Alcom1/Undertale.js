var Player = (function()
{
    var weapon;
    var armor;
    var hpCur;
    var hpMax;
    
    function init()
    {
        weapon = {};
        armor = {};
        hpCur = 2;
        hpMax = 20;
    }
    
    function getWeapon()
    {
        return weapon;
    }
    
    function getArmor()
    {
        return armor;
    }
    
    function getHPCur()
    {
        return hpCur;
    }
    
    function getHPMax()
    {
        return hpMax;
    }
    
    function heal(value)
    {
        Sound.playSound("heal", true);
        hpCur += value;
        if(hpCur >= hpMax)
        {
            hpCur = hpMax;
            return true;
        }
        return false;        
    }
    
    return {
        init : init,
        getWeapon : getWeapon,
        getArmor : getArmor,
        getHPCur : getHPCur,
        getHPMax : getHPMax,
        heal : heal,
    }
}());