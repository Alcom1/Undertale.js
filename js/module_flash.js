var Flash = (function()
{
    function init()
    {
        Soul.setup(new Vect(310, 309, 0));        
    }
    
    function update(dt)
    {
        if(Soul.update(dt))
        {
            return true;
        }
        
        return false;
    }
    
    function draw(ctx)
    {
        Soul.draw(ctx);    
    }
    
    return{
        init : init,
        update : update,
        draw : draw
    }
}());