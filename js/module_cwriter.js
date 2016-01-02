//Dialogue writer and selector module for combat sequence.
var Cwriter = (function()
{
    var timeCheck = 0;         //Current interval to wait to place a character. Changes based on special characters.
    var timeAsterisk = .75;    //Interval to use for asterisk.
    var timePeriod = .33;      //Interval to use for periods.
    var timeComma = .21;       //Interval to use for commas.
    var timeStandard = .033;   //Interval to use for all other characters.
    
    var text;                  //Text to display.
    var charCounter;           //Counter for characters in text being displayed.
    var timeCounter;           //Tracks time for character counting.
    
    var horizontalPositions;   //Positions for horizontal menu.
    
    var verticalPositions;     //Positions for vertical menu.
    
    function init()
    {
        horizontalPositions =
        [
            [100, 296],
            [356, 296],
            [100, 328],
            [356, 328],
            [100, 360],
            [356, 360]
        ]
        
        verticalPositions =
        [
            [100, 296],
            [100, 328],
            [100, 360]
        ]
    }
    
    //Set the time delays of the writer.
    function setTimes(
        _timeAsterisk,
        _timePeriod,
        _timeComma,
        _timeStandard)
    {
        timeCheck = 0;
        timeAsterisk = _timeAsterisk;
        timePeriod = _timePeriod;
        timeComma = _timeComma;
        timeStandard = _timeStandard;
    }
    
    //Set the text for the writer and reset counters.
    function setText(_text)
    {
        text = _text;
        charCounter = 0;       //Counter for the index of the most recent displayed character.
        timeCounter = 0;       //Counter for the time since a character was placed.        
    }
    
    //Update the writer.
    function update(dt)
    {
        //Tick.
        timeCounter += dt;
        
        //If time to place a new character and if there is a new character.
        if(timeCounter > timeCheck && charCounter < text.length)
        {
            //Reset counter and increment current character for next character.
            timeCounter = timeCounter - timeCheck;
            charCounter++;
            
            //SFX
            
            //Change interval for new character.
            switch(text.charAt(charCounter))
            {
                case ".":
                    app.main.sound.pauseSound("text"); 
                    timeCheck = timePeriod;
                    break;
                case ",":
                    app.main.sound.pauseSound("text"); 
                    timeCheck = timeComma;
                    break;
                case "*":
                    timeCheck = timeAsterisk;
                    break;
                default:
                    app.main.sound.playSound("text", false); 
                    timeCheck = timeStandard;
                    break;
            }
        }
        else
        {
            app.main.sound.pauseSound("text"); 
        }        
    }
    
    //Draw text.
    function drawText(ctx)
    {
        ctx.save();
        
        //Style.
        ctx.font = "24pt undertale";
        ctx.fillStyle = "#FFF";
        
        //Initial position.
        var textXPos = 52;
        var textYPos = 296;
        
        //Draw each active character, characters up to the character after the current character.
        for(var i = 0; i < charCounter + 1; i++)
        { 
            //Display character if not last character and asterisk.
            if(
                text.charAt(i) != "*" ||
                text.charAt(i) != "|" ||
                i < charCounter)
            {
                ctx.fillText(
                    text.charAt(i),
                    textXPos + 2 * Math.floor(Math.random() * 1.0004),     //Random text wobble.
                    textYPos + 2 * Math.floor(Math.random() * 1.0004));
            }
            
            if(text.charAt(i + 1) == "|")
            {
                ctx.fillStyle = text.substring(i + 2, i + 6);
                i += 5;
            }
            if(text.charAt(i + 1) == "\n") //New line moveover.
            {
                textXPos = 70;
                textYPos += 32;
            }
            else if(text.charAt(i + 1) == "*")  //Asterisk moveover
            {
                textXPos = 52;
                textYPos += 32;
            }
            else                                //Next-char moveover.
            {
                textXPos += ctx.measureText(text.charAt(i)).width;
            }
        }
        
        ctx.restore();        
    }
    
    //Draw a menu.
    function drawMenu(ctx, menu, menuState, MENU_STATE)
    {
        ctx.save();
        
        //Style.
        ctx.font = "24pt undertale";
        ctx.fillStyle = "#FFF";
        
        switch(menuState)
        {
            case MENU_STATE.ACT:
                drawMenuTexts(ctx, menu, horizontalPositions);
                break;
            case MENU_STATE.ITEM:
                drawMenuTexts(ctx, menu, horizontalPositions);
                break;
            case MENU_STATE.MERCY:
                drawMenuTexts(ctx, menu, verticalPositions);
                break;
            default:
                drawMenuTexts(ctx, menu, verticalPositions);
                break;
        }
        
        ctx.restore();
    }

    //Draw text for all menu options.
    function drawMenuTexts(ctx, menu, positions)
    {
        for(var i = 0; i < menu.length; i++)     
        {
            drawMenuText(ctx, menu[i], positions[i][0], positions[i][1]);
        }
    }

    //Draw text for a menu option.
    function drawMenuText(ctx, option, xPos, yPos)
    {
        //Asterisk.
        ctx.fillText(
            "*",
            xPos + 2 * Math.floor(Math.random() * 1.0004),
            yPos + 2 * Math.floor(Math.random() * 1.0004));
        
        //Text offset.
        xPos += 32;
        
        //Draw characters.
        for(var i = 0; i < text.length; i++)
        { 
            ctx.fillText(
                option.charAt(i),
                xPos + 2 * Math.floor(Math.random() * 1.0004),     //Random text wobble.
                yPos + 2 * Math.floor(Math.random() * 1.0004));
            xPos += ctx.measureText(option.charAt(i)).width;
        }    
    }

    //Skip text growing entirely.
    function skip ()
    {
        charCounter = text.length; 
    }

    //Reset text
    function reset()
    {
        charCounter = 0;
        timeCounter = 0;  
    }

    //Get the soul position for the option at a given menu index and style
    function getSoulPos (index, style)
    {
        var pos;
        
        switch(style)
        {
            case 0:
                pos = new Vect(
                    horizontalPositions[index][0] - 36, 
                    horizontalPositions[index][1] - 18, 
                    0);
                break;
            case 1:
                pos = new Vect(
                    verticalPositions[index][0] - 36, 
                    verticalPositions[index][1] - 18, 
                    0);
                break;
        }
        return pos;
    }
    
    return{
        init : init,
        setTimes : setTimes,
        setText : setText,
        update : update,
        drawText : drawText,
        drawMenu : drawMenu,
        skip : skip,
        reset : reset,
        getSoulPos : getSoulPos}
}());