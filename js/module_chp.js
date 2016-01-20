//Combat hp display module. Displays the Player's HP during the combat sequence.
var Chp = (function()
{
    var hpText; //"HP" image that literally displays the letters 'H' and 'P' and nothing else.

    //Init
    function init()
    {
        hpText = document.getElementById("hp"); 
    }
    
    //Draw
    function draw(ctx, cur, max)
    {
        ctx.save();

        ctx.drawImage(
            hpText,
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
    
    //Return
    return {
        init : init,
        draw : draw
    }
}());