//Combat Menu Object
var Cmenu = (function()
{
    var buttonFight;
    var buttonAct;
    var buttonItem;
    var buttonMercy;
    
    var buttonFightOver;
    var buttonActOver;
    var buttonItemOver;
    var buttonMercyOver;
    
    function init()
    {
        buttonFight = document.getElementById("button_fight");
        buttonAct = document.getElementById("button_act");
        buttonItem = document.getElementById("button_item");
        buttonMercy = document.getElementById("button_mercy");
        
        buttonFightOver = document.getElementById("button_fight_over");
        buttonActOver = document.getElementById("button_act_over");
        buttonItemOver = document.getElementById("button_item_over");
        buttonMercyOver = document.getElementById("button_mercy_over");        
    }

    function draw(ctx, menuState, selectState)
    {
        ctx.save();
        
        ctx.drawImage(                                 //Draw fight button
            menuState == selectState.FIGHT ? buttonFightOver : buttonFight,
            32, 
            432);
        ctx.drawImage(                                 //Draw act button
            menuState == selectState.ACT ? buttonActOver : buttonAct,
            185, 
            432);
        ctx.drawImage(                                 //Draw item button
            menuState == selectState.ITEM ? buttonItemOver : buttonItem,
            345, 
            432);
        ctx.drawImage(                                 //Draw mercy button
            menuState == selectState.MERCY ? buttonMercyOver : buttonMercy,
            500, 
            432);
            
        ctx.restore();
    }
    
    return{
        init : init,
        draw : draw
    }
}());