//Combat Menu Module. Displays the bottom menu buttons during the combat sequence.
var Cmenu = (function()
{
    var buttonFight;        //Image for fight button.
    var buttonAct;          //Image for act button.
    var buttonItem;         //Image for item button.
    var buttonMercy;        //Image for mercy button.
    
    var buttonFightOver;    //Image for fight selected button.
    var buttonActOver;      //Image for act selected button.
    var buttonItemOver;     //Image for item selected button.
    var buttonMercyOver;    //Image for mercy selected button.
    
    //Init
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

    //Draw
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
    
    //Return
    return{
        init : init,
        draw : draw,
    }
}());