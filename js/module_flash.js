//Flash module. Displays and manages the flash sequence before combat.
var Flash = (function()
{
    //Init
    function init()
    {
        Soul.setup(new Vect(310, 309, 0));        
    }
    
    //Update
    function update(dt)
    {
        if(Soul.update(dt))
        {
            return true;
        }
        
        return false;
    }
    
    //Draw
    function draw(ctx)
    {
        Soul.draw(ctx);    
    }
    
    //Return
    return{
        init : init,
        update : update,
        draw : draw
    }
}());