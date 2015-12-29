//Dialogue writer and selector for combat sequence.
var Cwriter = function(
    text,
    timeAsterisk,
    timePeriod,
    timeComma,
    timeStandard)
{
    this.text = text;
    this.charCounter = 0;       //Counter for the index of the most recent displayed character.
    this.timeCounter = 0;       //Counter for the time since a character was placed.
    this.timeCheck = 0;         //Current interval to wait to place a character. Changes based on special characters.
    this.timeAsterisk = .75;    //Interval to use for asterisk.
    this.timePeriod = .33;      //Interval to use for periods.
    this.timeComma = .21;       //Interval to use for commas.
    this.timeStandard = .033;   //Interval to use for all other characters.
}

//Update the writer.
Cwriter.prototype.update = function(dt)
{
    //Tick.
    this.timeCounter += dt;
    
    //If time to place a new character.
    if(this.timeCounter > this.timeCheck && this.charCounter < this.text.length)
    {
        //Reset counter and increment current character for next character.
        this.timeCounter = this.timeCounter - this.timeCheck;
        this.charCounter++;
        
        //SFX
        app.main.sound.playSound("text", false);
        
        //Change interval for new character.
        switch(this.text.charAt(this.charCounter))
        {
            case ".":
                this.timeCheck = this.timePeriod;
                break;
            case ",":
                this.timeCheck = this.timeComma;
                break;
            case "*":
                this.timeCheck = this.timeAsterisk;
                break;
            default:
                this.timeCheck = this.timeStandard;
                break;
        }
    }
}

// Display the writer's text.
Cwriter.prototype.draw = function(ctx)
{
    ctx.save();
    
    //Style.
    ctx.font = "24pt undertale";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    
    //Initial asterisk.
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
                textXPos + Math.floor(Math.random() * 1.002) - 1,
                textYPos + Math.floor(Math.random() * 1.002) - 1);
        }
        if(this.text.charAt(i + 1) == "\n") //New line moveover.
        {
            textXPos = 64;
            textYPos += 32;
        }
        if(this.text.charAt(i + 1) == "*")  //Asterisk moveover
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

//Skip text growing entirely.
Cwriter.prototype.skip = function()
{
    this.charCounter = this.text.length; 
}

//Get a soul 
Cwriter.prototype.getSoulPos = function()
{
    var pos = new Vect(0, 0, 0);
    return pos;
}