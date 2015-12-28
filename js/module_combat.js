// Combat module
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .combat module and immediately invoke it in an IIFE
app.combat = (function()
{
	console.log("combat.js module loaded");
    
	var combatState;
    var COMBAT_STATE = Object.freeze
	({
		MAIN : 0,
		FIGHT : 1,
		ACT : 2,
        ITEM : 3,
        MERCY : 4,
        ASSAULT : 5,
        SURVIVE : 6,
        FLASH : 7,
        DEATH : 8
	});
    
	var selectState;
    var SELECT_STATE = Object.freeze
	({
		FIGHT : 1,
		ACT : 2,
        ITEM : 3,
        MERCY : 4,
	});
    
    var cmenu;
    var hpDisplay;
    var bbox;
    var soul;
    var startPos;
    var curHealth;
    var maxHealth;
	
	//Init
	function init()
	{
        //Initial states for combat
        combatState = COMBAT_STATE.MAIN;
        selectState = SELECT_STATE.FIGHT;
        
        //Combat menu
        cmenu = new Cmenu();
        
        //HP display
        hpDisplay = new HPDisplay();
        
        //Bullet box
        bbox = new Bbox(320, 320, 574, 140, 1);
        
        //Soul
        startPos = new Vect(310, 309, 0);
		var soulImage = document.getElementById("heart");
		var soulImageDmg = document.getElementById("heart_dmg");
		soul = new Soul(startPos, soulImage, soulImageDmg);
	}
    
    //Initialize with provided canvas.
    function setup(ctx, cur, max)
    {
		soul.getCollision(ctx);   //Form collision data for player.
        curHealth = cur;
        maxHealth = max;
    }
    
    //Update
	function update(dt)
	{
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
                {
                    selectState++;
                    if(selectState > SELECT_STATE.MERCY)
                        selectState = SELECT_STATE.MERCY;
                    else
                        app.main.sound.playSound("button");
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
                {
                    selectState--;
                    if(selectState < SELECT_STATE.FIGHT)
                        selectState = SELECT_STATE.FIGHT;
                    else
                        app.main.sound.playSound("button");
                }
                break;
            case COMBAT_STATE.FIGHT:
                break;
            case COMBAT_STATE.ACT:
                break;
            case COMBAT_STATE.ITEM:
                break;
            case COMBAT_STATE.MERCY:
                break;
            case COMBAT_STATE.ASSAULT:
                break;
            case COMBAT_STATE.SURVIVE:
				bbox.transition(dt);
				soul.move(dt);
				soul.limit(bbox.getBound());
                break;
            case COMBAT_STATE.FLASH:
                break;
            case COMBAT_STATE.DEATH:
                break;
        }
        
        //Tapping mode.
        myKeys.keydown = [];
	}
    
    //Draw
	function draw(ctx)
	{
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, selectState, SELECT_STATE);
                switch(selectState)
                {
                    case SELECT_STATE.FIGHT:
				        soul.drawAt(ctx, new Vect(40, 446, 0));
                        break;
                    case SELECT_STATE.ACT:
				        soul.drawAt(ctx, new Vect(193, 446, 0));
                        break;
                    case SELECT_STATE.ITEM:
				        soul.drawAt(ctx, new Vect(353, 446, 0));
                        break;
                    case SELECT_STATE.MERCY:
				        soul.drawAt(ctx, new Vect(508, 446, 0));
                        break;
                }
                break;
            case COMBAT_STATE.FIGHT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ACT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ITEM:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.MERCY:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ASSAULT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.SURVIVE:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
				soul.checkCollision(ctx);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.FLASH:
				soul.draw(ctx);
                break;
            case COMBAT_STATE.DEATH:
				soul.draw(ctx);
                break;
        }
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
        setup : setup,
        update : update,
        draw : draw
	}
}());