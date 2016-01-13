//Player soul module
var Soul = (function()
{
    var pos;            //Position (top-left corner)
    var sprite;         //Main sprite
    var spriteDmg;	    //Second sprite to display when taking damage.
    var spriteOver;     //Overworld Sprite
    
    var speed;			//Soul speed on bullet board.
    var colData;    	//Collision data
    
    var soulState;
    var SOUL_STATE = Object.freeze(
    {
        OKAY : 0,
        DAMAGED : 1,
        FLASH : 2,
        TRANSITION : 3,
        FADEIN : 4,
    });
    
    var delay;
    var delayCounter;
    
    //Initialize the soul.
    function init()
    {
        sprite = document.getElementById("heart");
        spriteDmg = document.getElementById("heart_dmg");
        spriteOver = document.getElementById("heart_over");
    }
    
    //Setup the soul.
    function setup(_pos)
    {
        pos = _pos;
        soulState = SOUL_STATE.FLASH;
        delayCounter = 0;
        delay = .4;
        speed = 100;
        Sound.playSound("flash", true);
    }
    
    //Update the player soul.
    function update(dt)
    {
        switch(soulState)
        {
            case SOUL_STATE.FLASH:
                delayCounter += dt;
                if(delayCounter > delay)
                {
                    delayCounter = 0;
                    delay = 2;
                    soulState = SOUL_STATE.TRANSITION;
                }
                break;
            case SOUL_STATE.TRANSITION:
                delayCounter += dt;
                pos.add(pos.getSub(new Vect(40, 446, 0)).getNorm().getMult(-400 * dt));
                if(pos.x < 40)
                {
                    pos = new Vect(310, 309, 0);
                    delayCounter = 0;
                    delay = .5;
                    soulState = SOUL_STATE.FADEIN;
                    return true;
                }
                break;
            case SOUL_STATE.FADEIN:
                delayCounter += dt;
                if(delayCounter > delay)
                {
                    soulState = SOUL_STATE.OKAY;
                }
                break;
        }
        
        return false;
    }
    
    //Gets an opacity value based on the current delay value
    function getOpacity()
    {
        return delayCounter * 4; 
    }
    
    //Draws the player soul.
    function draw(ctx)
    {
        ctx.save();
        switch(soulState)
        {
            case SOUL_STATE.OKAY:
                ctx.drawImage(
                    sprite,
                    pos.x,
                    pos.y);
                break;
            case SOUL_STATE.DAMAGED:
                ctx.drawImage(
                    spriteDmg,
                    pos.x,
                    pos.y);
                break;
            case SOUL_STATE.FLASH:
                if(Math.floor(delayCounter * 50) % 5 > 2)
                {
                    break;
                }
            case SOUL_STATE.TRANSITION:
                ctx.drawImage(
                    spriteOver,
                    pos.x,
                    pos.y);
                break;
        }
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
                soulState = SOUL_STATE.DAMAGED;
                return;
            }
        }
        
        //No damage if no collision occured.
        soulState = SOUL_STATE.OKAY;
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
        update : update,
        getOpacity : getOpacity,
        draw : draw,
        drawAt : drawAt,
        getCollision : getCollision,
        checkCollision : checkCollision,
        move : move,
        limit : limit
    }
}());