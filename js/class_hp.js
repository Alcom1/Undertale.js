//Combat hp display object
var HPDisplay = function()
{
    this.hpText = document.getElementById("hp");
}

HPDisplay.prototype.draw = function(ctx, cur, max)
{
    ctx.save();
    
    ctx.drawImage(
		this.hpText,
		244, 
		405);
    
    ctx.fillStyle = "#F00";
    ctx.fillRect(275, 400, Math.floor(max * 1.25), 21);
    ctx.fillStyle = "#FF0";
    ctx.fillRect(275, 400, Math.floor(cur * 1.25), 21);
    
    ctx.font = "24px hpview";
    ctx.fillStyle = "#FFF"; 
    ctx.fillText(
        ("0" + cur).slice(-2) + " / " + ("0" + max).slice(-2),
        289 + Math.floor(max * 1.25),
        418);
    ctx.restore();
}