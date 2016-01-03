var Cdefend = function()
{
    this.width = 140;
    this.height = 140;
}

Cdefend.prototype.setup = function()
{
    this.durationCounter = 0;
    this.duration = 5;
}

Cdefend.prototype.update = function(dt)
{
    this.durationCounter += dt;
    return this.durationCounter > this.duration;
}

Cdefend.prototype.draw = function(ctx)
{
    
}