//Module that represents the player's attributes.
var Player = (function()
{
    var weapon;     //Currently equipped weapon.
    var armor;      //Currently equipped armor.
    var hpCur;      //Current HP
    var hpMax;      //Maximum HP
    
    //Init
    function init()
    {
        weapon = {};
        armor = {};
        hpCur = 20;
        hpMax = 20;
    }
    
    //Getter for weapon
    function getWeapon()
    {
        return weapon;
    }
    
    //Getter for armor
    function getArmor()
    {
        return armor;
    }
    
    //Getter for current HP
    function getHPCur()
    {
        return hpCur;
    }
    
    //Getter for max HP
    function getHPMax()
    {
        return hpMax;
    }
    
    //Heal the player. Returns true at full health.
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
    
    //Damage the player. Returns true at 0 health.
    function damage(value)
    {
        Sound.playSound("damage", true);
        hpCur -= value;
        if(hpCur < 0)
        {
            hpCur = 0;
            return true;
        }
        return false;        
    }
    
    //Return
    return {
        init : init,
        getWeapon : getWeapon,
        getArmor : getArmor,
        getHPCur : getHPCur,
        getHPMax : getHPMax,
        heal : heal,
        damage : damage,
    }
}());