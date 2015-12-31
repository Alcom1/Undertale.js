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
		MAIN : 0,     //Main state. State in which one of the four options is to be selected.
		FIGHT : 1,    //State where the player aims.
		ACT : 2,      //State where the player selects an action.
        ITEM : 3,     //State where the player selects an item.
        MERCY : 4,    //State where the player offers mercy or flees.
        ASSAULT : 5,  //State where the player attacks.
        SURVIVE : 6,  //State where the player defends themself.
        FLASH : 7,    //State where the player's flash animation occurs, before the combat sequence begins.
        DEATH : 8,    //State where the player's death animation occurs, after death.
        NAME : 9      //State where the player selects an enemy by name.
	});
    
	var menuState;
    var MENU_STATE = Object.freeze
	({
		FIGHT : 1,    //Player has selected to fight.
		ACT : 2,      //Player has selected to act.
        ITEM : 3,     //Player has selected to use an item.
        MERCY : 4,    //Player has selected to offer mercy.
	});
    
    var selectState;  //Index of currently selected option in any menu.
    
    var cmenu;        //Menu button display object.
    var cwriter;      //Text display object.
    var hpDisplay;    //HP display object.
    var bbox;         //Bullet-box object.
    var soul;         //Player's soul object.
    var startPos;     //Starting position 
    var curHealth;    //Player current health.
    var maxHealth;    //Player max health.
	
	//Init
	function init()
	{
        //Initial states for combat
        combatState = COMBAT_STATE.MAIN;
        menuState = MENU_STATE.FIGHT;
        selectState = 0;
        
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
        cwriter = new Cwriter(
            "* JavaScript is a high-level,  dynamic,  \nuntyped,  and interpreted programming \nlanguage.  -Wikipedia",
            ["Enemy"],
            ["Check", "Beep", "Boop"],
            ["Item A", "Item B", "Item C", "Item D"],
            ["Mercy", "Flee"],
            .75,
            .33,
            .21,
            .033);
		soul.getCollision(ctx);   //Form collision data for player.
        curHealth = cur;
        maxHealth = max;
    }
    
    //Update
	function update(dt)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
                cwriter.update(dt);
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
                {
                    menuState++;
                    if(menuState > MENU_STATE.MERCY)
                        menuState = MENU_STATE.MERCY;
                    else
                        app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
                {
                    menuState--;
                    if(menuState < MENU_STATE.FIGHT)
                        menuState = MENU_STATE.FIGHT;
                    else
                        app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    cwriter.skip();
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                break;
            case COMBAT_STATE.FIGHT:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                break;
            case COMBAT_STATE.ACT:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                break;
            case COMBAT_STATE.ITEM:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
                break;
            case COMBAT_STATE.MERCY:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.NAME;
                    app.main.sound.playSound("button", true);
                }
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
            case COMBAT_STATE.NAME:
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
                {
                    combatState = menuState;
                    app.main.sound.playSound("button", true);
                }
            	if(myKeys.keydown[myKeys.KEYBOARD.KEY_X])
                {
                    combatState = COMBAT_STATE.MAIN;
                    cwriter.reset();
                    app.main.sound.playSound("button", true);
                }
                break;
        }
        
        //Tapping mode.
        if(combatState != COMBAT_STATE.SURVIVE)
            myKeys.keydown = [];
	}
    
    //Draw
	function draw(ctx)
	{
        //States for the combat sequence.
        switch(combatState)
        {
            case COMBAT_STATE.MAIN:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, menuState, MENU_STATE);
                cwriter.drawText(ctx);
                switch(menuState)
                {
                    case MENU_STATE.FIGHT:
				        soul.drawAt(ctx, new Vect(40, 446, 0));
                        break;
                    case MENU_STATE.ACT:
				        soul.drawAt(ctx, new Vect(193, 446, 0));
                        break;
                    case MENU_STATE.ITEM:
				        soul.drawAt(ctx, new Vect(353, 446, 0));
                        break;
                    case MENU_STATE.MERCY:
				        soul.drawAt(ctx, new Vect(508, 446, 0));
                        break;
                }
                break;
            case COMBAT_STATE.FIGHT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ACT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawOption(ctx, menuState, MENU_STATE);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ITEM:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawOption(ctx, menuState, MENU_STATE);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.MERCY:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
                cwriter.drawOption(ctx, menuState, MENU_STATE);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.ASSAULT:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.SURVIVE:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, 0, MENU_STATE);
				soul.checkCollision(ctx);
				soul.draw(ctx);
                break;
            case COMBAT_STATE.FLASH:
				soul.draw(ctx);
                break;
            case COMBAT_STATE.DEATH:
				soul.draw(ctx);
                break;
            case COMBAT_STATE.NAME:
				bbox.draw(ctx);
				hpDisplay.draw(ctx, curHealth, maxHealth);
                cmenu.draw(ctx, menuState, MENU_STATE);
				cwriter.drawOption(ctx, 0, MENU_STATE, selectState);
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