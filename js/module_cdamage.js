// Combat damage display module.
var Cdamage = (function()
{
    var damage;
    var pos;
    
    function init()
    {
        
    }
    
    function setup(_damage)
    {
        damage = _damage.toString();
        pos = new Vect(150, 60, 0);
    }
    
    function update()
    {
        
    }
    
    function draw(ctx)
    {
        var subPos = pos.get();
        for(var i = 0; i < damage.length; i++)
        {
            ctx.drawImage(
                document.getElementById("d" + damage.charAt(i)),
                subPos.x, 
                subPos.y);
                
            if(damage.charAt(i) == 1)
            {    
                subPos.x += 20;
            }
            else
            {
                subPos.x += 32;
            }
        }
    }
    
    return {
        init : init,
        setup : setup,
        update : update,
        draw : draw
    }
}());