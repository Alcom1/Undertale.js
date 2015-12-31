//Dialogue writer and selector for combat sequence.
var Cwriter = function(
    timeAsterisk,
    timePeriod,
    timeComma,
    timeStandard)
{
    this.timeCheck = 0;         //Current interval to wait to place a character. Changes based on special characters.
    this.timeAsterisk = .75;    //Interval to use for asterisk.
    this.timePeriod = .33;      //Interval to use for periods.
    this.timeComma = .21;       //Interval to use for commas.
    this.timeStandard = .033;   //Interval to use for all other characters.
    
    this.horizontalPositions =
    [
        [100, 296],
        [356, 296],
        [100, 328],
        [356, 328],
        [100, 360],
        [356, 360]
    ]
    
    this.verticalPositions =
    [
        [100, 296],
        [100, 328],
        [100, 360]
    ]
}

//Reset the main text that the writer displays.
Cwriter.prototype.setText = function(text)
{
    this.text = text;
    this.charCounter = 0;       //Counter for the index of the most recent displayed character.
    this.timeCounter = 0;       //Counter for the time since a character was placed.
}

//Update the writer.
Cwriter.prototype.update = function(dt)
{
    //Tick.
    this.timeCounter += dt;
    
    //If time to place a new character and if there is a new character.
    if(this.timeCounter > this.timeCheck && this.charCounter < this.text.length)
    {
        //Reset counter and increment current character for next character.
        this.timeCounter = this.timeCounter - this.timeCheck;
        this.charCounter++;
        
        //SFX
        
        //Change interval for new character.
        switch(this.text.charAt(this.charCounter))
        {
            case ".":
                app.main.sound.pauseSound("text"); 
                this.timeCheck = this.timePeriod;
                break;
            case ",":
                app.main.sound.pauseSound("text"); 
                this.timeCheck = this.timeComma;
                break;
            case "*":
                this.timeCheck = this.timeAsterisk;
                break;
            default:
                app.main.sound.playSound("text", false); 
                this.timeCheck = this.timeStandard;
                break;
        }
    }
    else
    {
        app.main.sound.pauseSound("text"); 
    }
}

// Display the writer's text.
Cwriter.prototype.drawText = function(ctx)
{
    ctx.save();
    
    //Style.
    ctx.font = "24pt undertale";
    ctx.fillStyle = "#FFF";
    
    //Initial position.
    var textXPos = 52;
    var textYPos = 296;
    
    //Draw each active character, characters up to the character after the current character.
    for(var i = 0; i < this.charCounter + 1; i++)
    { 
        //Display character if not last character and asterisk.
        if(this.text.charAt(i) != "*" || i < this.charCounter)
        {
            ctx.fillText(
                this.text.charAt(i),
                textXPos + 2 * Math.floor(Math.random() * 1.0004),     //Random text wobble.
                textYPos + 2 * Math.floor(Math.random() * 1.0004));
        }
        
        if(this.text.charAt(i + 1) == "\n") //New line moveover.
        {
            textXPos = 64;
            textYPos += 32;
        }
        else if(this.text.charAt(i + 1) == "*")  //Asterisk moveover
        {
            textXPos = 52;
            textYPos += 32;
        }
        else                                //Next-char moveover.
        {
            textXPos += ctx.measureText(this.text.charAt(i)).width;
        }
    }
    
    ctx.restore();
}

//Draw a menu. 
Cwriter.prototype.drawMenu = function(ctx, menu, menuState, MENU_STATE)
{
    ctx.save();
    
    //Style.
    ctx.font = "24pt undertale";
    ctx.fillStyle = "#FFF";
    
    switch(menuState)
    {
        case MENU_STATE.ACT:
            this.drawMenuTexts(ctx, menu, this.horizontalPositions);
            break;
        case MENU_STATE.ITEM:
            this.drawMenuTexts(ctx, menu, this.horizontalPositions);
            break;
        case MENU_STATE.MERCY:
            this.drawMenuTexts(ctx, menu, this.verticalPositions);
            break;
        default:
            this.drawMenuTexts(ctx, menu, this.verticalPositions);
            break;
    }
    
    ctx.restore();
}

//Draw text for all menu options.
Cwriter.prototype.drawMenuTexts = function(ctx, menu, positions)
{
    for(var i = 0; i < menu.length; i++)     
    {
        this.drawMenuText(ctx, menu[i], positions[i][0], positions[i][1]);
    }
}

//Draw text for a menu option.
Cwriter.prototype.drawMenuText = function(ctx, option, xPos, yPos)
{
    //Asterisk.
    ctx.fillText(
        "*",
        xPos + 2 * Math.floor(Math.random() * 1.0004),
        yPos + 2 * Math.floor(Math.random() * 1.0004));
    
    //Text offset.
    xPos += 32;
    
    //Draw characters.
    for(var i = 0; i < this.text.length; i++)
    { 
        ctx.fillText(
            option.charAt(i),
            xPos + 2 * Math.floor(Math.random() * 1.0004),     //Random text wobble.
            yPos + 2 * Math.floor(Math.random() * 1.0004));
        xPos += ctx.measureText(option.charAt(i)).width;
    }    
}

//Skip text growing entirely.
Cwriter.prototype.skip = function()
{
    this.charCounter = this.text.length; 
}

//Reset text
Cwriter.prototype.reset = function()
{
    this.charCounter = 0;
    this.timeCounter = 0;  
}

//Get the soul position for the option at a given menu index and style
Cwriter.prototype.getSoulPos = function(index, style)
{
    var pos;
    
    switch(style)
    {
        case 0:
            pos = new Vect(
                this.horizontalPositions[index][0] - 36, 
                this.horizontalPositions[index][1] - 18, 
                0);
            break;
        case 1:
            pos = new Vect(
                this.verticalPositions[index][0] - 36, 
                this.verticalPositions[index][1] - 18, 
                0);
            break;
    }
    return pos;
}