//Player soul module
var Soul = (function()
{
    var pos;            //Position (top-left corner)
    var sprite;         //Main sprite
    var spriteDmg;	    //Second sprite to display when taking damage.
    
    var dmg;			//True when taking damage.
    var speed;			//Soul speed on bullet board.
    
    var colData;    	//Collision data
    
    //Initialize the soul.
    function init()
    {
        sprite = document.getElementById("heart");
        spriteDmg = document.getElementById("heart_dmg");
    }
    
    //Setup the soul.
    function setup(_pos)
    {
        pos = _pos;
        dmg = false;
        speed = 100;
    }
    
    //Draws the player soul.
    function draw(ctx)
    {
        ctx.save();
        ctx.drawImage(
            dmg ? spriteDmg : sprite,	//Draw damaged soul when taking damage.
            pos.x,
            pos.y);
        ctx.restore();
    }
    
    //Draws a soul at the provided position.
    function drawAt(ctx, posForced)
    {
        ctx.save();
        ctx.drawImage(
            sprite,
            posForced.x,
            posForced.y);
        ctx.restore();
    }

    //Get a 1D array of pixel positions to check collision for.
    function getCollision(ctx)
    {
        colData = [];	//Collision data
        
        //Draw player and get the data at its location.
        draw(ctx);
        var imgData = ctx.getImageData(
            pos.x,
            pos.y,
            sprite.width,
            sprite.height);
        
        //For each pixel at player position, if it's red, add that pixel to the collision data.
        for(var j = 0; j < imgData.height; j++)
        {
            for(var i = 0; i < imgData.width; i++)
            {
                if(imgData.data[(j * imgData.width + i) * 4])
                {
                    colData.push((j * imgData.width + i) * 4);
                }
            }
        }
    }

    //Check collision for player
    function checkCollision(ctx)
    {
        //Get image data at player position (Hopefully before the player is drawn).
        var imgData = ctx.getImageData(
            pos.x,
            pos.y,
            sprite.width,
            sprite.height);
        
        //For each index in collision data, check if the pixel has a non-0 red channel.
        for(var i = 0; i < colData.length; i++)
        {
            //If non-black pixel is detected, set damage to true and return true.
            if(imgData.data[colData[i]])
            {
                dmg = true;
                return;
            }
        }
        
        //No damage if no collision occured.
        dmg = false;
    }

    //Move soul based on key input
    function move(dt)
    {
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
        {
            pos.y -= Math.round(speed * dt);	//Round positions for pixel-perfect positioning.
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
        {
            pos.x += Math.round(speed * dt);
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            pos.y += Math.round(speed * dt);
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
        {
            pos.x -= Math.round(speed * dt);
        }
    }

    //Limit the soul to be within a box.
    function limit(bound)
    {
        if(pos.x < bound[0])	//West limit.
        {
            pos.x = bound[0];
        }
        if(pos.y < bound[1])	//North limit.
        {
            pos.y = bound[1];
        }
        if(pos.x + sprite.width > bound[2])	//East limit
        {
            pos.x = bound[2] - sprite.width;
        }
        if(pos.y + sprite.height > bound[3])	//South limit
        {
            pos.y = bound[3] - sprite.height;
        }
    }
    
    return{
        init : init,
        setup : setup,
        draw : draw,
        drawAt : drawAt,
        getCollision : getCollision,
        checkCollision : checkCollision,
        move : move,
        limit : limit
    }
}());