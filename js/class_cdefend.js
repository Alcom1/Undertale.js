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
    ctx.save();
    ctx.lineWidth = 3;
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.rect(
        150 + 75 * this.durationCounter,
        265,
        40,
        40);
    ctx.rect(
        100 + 85 * this.durationCounter,
        305,
        40,
        40);
    ctx.rect(
        200 + 70 * this.durationCounter,
        345,
        40,
        40);
    ctx.rect(
        50 + 70 * this.durationCounter,
        345,
        40,
        40);
    ctx.rect(
        50 + 70 * this.durationCounter,
        305,
        40,
        40);
    ctx.rect(
        -40 + 74 * this.durationCounter,
        305,
        40,
        40);
    ctx.rect(
        -40 + 74 * this.durationCounter,
        265,
        40,
        40);
    ctx.fill();
    ctx.stroke();
    ctx.restore(); 
}