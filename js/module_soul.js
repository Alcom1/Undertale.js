//Player soul module
var Soul = (function()
{
    var pos;            //Position (top-left corner)
    var sprite;         //Main sprite
    var spriteDmg;	    //Second sprite to display when taking damage.
    var spriteOver;     //Overworld Sprite
    
    var speed;			//Soul speed on bullet board.
    var colData;    	//Collision data
    
    var state;          //State of the player.
    var STATE = Object.freeze(
    {
        OKAY : 0,
        DAMAGED : 1,
        FLASH : 2,
        TRANSITION : 3,
        FADEIN : 4,
    });
    
    var duration;           //Duration of soul states.
    var durationCounter;    //Counter for duration.
    
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
        state = STATE.FLASH;
        durationCounter = 0;
        duration = .4;
        speed = 100;
        Sound.playSound("flash", true);
    }
    
    //Reset the soul.
    function reset()
    {
        pos = new Vect(310, 309, 0);
        state = STATE.OKAY;
    }
    
    //Update the player soul.
    function update(dt)
    {
        switch(state)
        {
            case STATE.DAMAGED:
                durationCounter += dt;
                if(durationCounter > duration)
                {
                    state = STATE.OKAY;
                }
                break;
            case STATE.FLASH:
                durationCounter += dt;
                if(durationCounter > duration)
                {
                    durationCounter = 0;
                    duration = 2;
                    state = STATE.TRANSITION;
                }
                break;
            case STATE.TRANSITION:
                durationCounter += dt;
                pos.add(pos.getSub(new Vect(40, 446, 0)).getNorm().getMult(-400 * dt));
                if(pos.x < 40)
                {
                    pos = new Vect(310, 309, 0);
                    durationCounter = 0;
                    duration = .5;
                    state = STATE.FADEIN;
                    return true;
                }
                break;
            case STATE.FADEIN:
                durationCounter += dt;
                if(durationCounter > duration)
                {
                    state = STATE.OKAY;
                }
                return true;
        }
        
        return false;
    }
    
    //Gets an opacity value based on the current duration value
    function getOpacity()
    {
        return durationCounter * 4; 
    }
    
    //Draws the player soul.
    function draw(ctx)
    {
        ctx.save();
        switch(state)
        {
            case STATE.OKAY:
                ctx.drawImage(
                    sprite,
                    pos.x,
                    pos.y);
                break;
            case STATE.DAMAGED:
                if(Math.floor(durationCounter * 5) % 2)
                {
                    ctx.drawImage(
                        spriteDmg,
                        pos.x,
                        pos.y);
                }
                else
                {
                    ctx.drawImage(
                        sprite,
                        pos.x,
                        pos.y);
                }
                break;
            case STATE.FLASH:
                if(Math.floor(durationCounter * 50) % 5 > 2)
                {
                    break;
                }
            case STATE.TRANSITION:
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
        ctx.globalAlpha = 1;
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
        if(state == STATE.OKAY)
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
                    durationCounter = 0;
                    duration = 4;
                    Player.damage(4);
                    state = STATE.DAMAGED;
                    return;
                }
            }
        }
    }

    //Move soul based on key input
    function move(dt)
    {
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
        {
            pos.y -= speed * dt;
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
        {
            pos.x += speed * dt;
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
        {
            pos.y += speed * dt;
        }
        if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
        {
            pos.x -= speed * dt;
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
    
    //Return
    return{
        init : init,
        setup : setup,
        reset : reset,
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