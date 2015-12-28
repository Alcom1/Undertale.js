//Combat Menu Object
var Cmenu = function()
{
    this.buttonFight = document.getElementById("button_fight");
    this.buttonAct = document.getElementById("button_act");
    this.buttonItem = document.getElementById("button_item");
    this.buttonMercy = document.getElementById("button_mercy");
    
    this.buttonFightOver = document.getElementById("button_fight_over");
    this.buttonActOver = document.getElementById("button_act_over");
    this.buttonItemOver = document.getElementById("button_item_over");
    this.buttonMercyOver = document.getElementById("button_mercy_over");
}

Cmenu.prototype.draw = function(ctx, selectState, SELECT_STATE)
{
    ctx.save();
    
	ctx.drawImage(                                 //Draw fight button
		selectState == SELECT_STATE.FIGHT ? this.buttonFightOver : this.buttonFight,
		32, 
		432);
	ctx.drawImage(                                 //Draw act button
		selectState == SELECT_STATE.ACT ? this.buttonActOver : this.buttonAct,
		185, 
		432);
	ctx.drawImage(                                 //Draw item button
		selectState == SELECT_STATE.ITEM ? this.buttonItemOver : this.buttonItem,
		345, 
		432);
	ctx.drawImage(                                 //Draw mercy button
		selectState == SELECT_STATE.MERCY ? this.buttonMercyOver : this.buttonMercy,
		500, 
		432);
        
    ctx.restore();
}